import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../constants';
import { AuthContext } from '../../components/context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import client from '../../api/client';
import axiosInstance from '../../api/axiosInstance';

const ScanQr = () => {
  const { user } = React.useContext(AuthContext);
  const [scanQr, setScanQr] = useState(false);
  const [permission, setPermission] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigation = useNavigation();
  const [classId, setClassId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [studentId, setstudentId] = useState(null);
  const [error, setError] = useState(null);
  const apiCall = async () => {};
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);
  // if (permission === null) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Requesting for camera permission</Text>
  //     </View>
  //   );
  // }
  // if (permission === false) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ margin: 10 }}>No access to camera</Text>
  //       <Button
  //         title={"Allow Camera"}
  //         onPress={() => askForCameraPermission()}
  //       />
  //     </View>
  //   );
  // }

  const handleQrCodeScanned = async ({ data }) => {
    setScanQr(true);
    const qrCodeData = data;

    const { classId, teacherId, timestamp } = JSON.parse(qrCodeData);
    setClassId(classId);
    setstudentId(user._id);
    console.log(classId, user._id);
    // console.log(classId);
    // console.log(user._id);
    // You can add additional validation here if needed
    await axiosInstance
      .get(
        `/api/class/teacher/attendance/takeAttendence/${classId}/students/${user._id}/attendance`,
      )
      .then((res) => {
        if (res.data.success === true) {
          Alert.alert(res.data.message);
          return;
        }
        if (res.data.success === false) {
          Alert.alert(res.data.message);
          return;
        }
      });

    // try {
    //   const { classId, teacherId, timestamp } = JSON.parse(qrCodeData);
    //   setClassId(classId);
    //   setstudentId(user._id);
    //   console.log(classId, user._id);
    //   // console.log(classId);
    //   // console.log(user._id);
    //   // You can add additional validation here if needed
    //   const res = await client
    //     .get(
    //       `/api/class/teacher/takeAttendence/${classId}/students/${user._id}/attendance`
    //     )
    //     .then((response) => {
    //       // setClassId(classId);
    //       // setstudentId(user._id);

    //       console.log(response);
    //     });
    //   // .catch((error) => {
    //   //   console.log(error);
    //   //   setError("Failed to retrieve class and teacher information");
    //   // });
    //   console.log(res);
    // } catch (error) {
    //   setError("Invalid QR code data");
    // }
  };

  useEffect(() => {
    apiCall();
  }, []);
  return (
    <>
      <>
        <View style={styles.container}>
          <View style={styles.barcodebox}>
            {/* <View style={styles.container}> */}
            <BarCodeScanner
              onBarCodeScanned={scanQr ? undefined : handleQrCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanQr && (
              <Button
                title='tap to scan again'
                onPress={() => setScanQr(false)}
              />
            )}
          </View>
          <Text>
            {/* {error && <Text>{error}</Text>}  */}
            {classId && studentId && (
              <Text>
                Scanned QR code for class {classId} with teacher {studentId}
              </Text>
            )}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
          {/* {userDetails.map} */}
        </View>
      </>
    </>
  );
};

export default ScanQr;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 17,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
