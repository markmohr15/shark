import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';
import SharkText from '../components/SharkText';
import SettingsForm from '../components/SettingsForm';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import { ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "black",
  },
  message: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 15,
    paddingRight: 15,
  },
  form: {
    flex: 8,
    paddingTop: 30,
  },
  destroy: {
    flex: 1,
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
  },
});

const GET_SPORTSBOOKS = gql`
  query sportsbooks{
    sportsbooks {
      name
    }
  }    
`;

export const DESTROY_USER = gql`
  mutation destroyUser {
    destroyUser(input: {}) {
      id     
    }
  }
`;

const SettingsScreen = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    return unsubscribe;
  }, [navigation]);

  const [overlayVisible, setOverlayVisible] = useState(false);

  const [destroyUser] = useMutation(DESTROY_USER,
    {
      onCompleted(data) {
        navigation.navigate('Sign Out')
      },
      onError(error) {
        console.log(error)
      }
    }
  );

  const destroy = async () => {
    destroyUser();
  }

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const { loading, error, data, refetch } = useQuery(GET_SPORTSBOOKS, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error.message}/>

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <SharkText>Select which sportsbooks you would like us to use for lines and triggers</SharkText>
      </View>
      <View style={styles.form}>
        { data.sportsbooks.length == 0 ?
          <SettingsForm sportsbooks={[]}/>
        :
          <SettingsForm sportsbooks={data.sportsbooks.map(x => x.name)}/>
        }
      </View>
      <View style={styles.destroy}>
        <Button title={"Delete Your Account"}
                type="clear"
                onPress={event => toggleOverlay()}
                titleStyle={styles.buttonText}
        />
        <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
          <Text>Are you sure you want to delete your account? This is irreversible.</Text>
          <Button title={"YES"}
                  type="clear"
                  onPress={event => destroy()}
          />
          <Button title={"NO"}
                  type="clear"
                  onPress={event => toggleOverlay()}
          />
        </Overlay>
      </View>
    </View>
  );
}

export default SettingsScreen;
