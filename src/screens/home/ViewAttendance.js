import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from '../../api/axiosInstance';
import { COLORS, ROUTES } from '../../constants';
import { AuthContext } from '../../components/context';
import { VictoryPie } from 'victory-native';

const ViewAttendance = ({ navigation, route }) => {
  const { user } = React.useContext(AuthContext);
  const studentId = user ? user._id : null;
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    const { courseId } = route.params;
    axiosInstance
      .get(
        `/api/class/student/attendance/calculateAttendance/${courseId}/students/${studentId}`,
      )
      .then((response) => {
        console.log(response.data);
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons name='ios-school' size={28} color={COLORS.primary} />{' '}
        Attendance
      </Text>

      {attendanceData ? (
        <View style={styles.chartContainer}>
          <Text style={styles.percentage}>
            {attendanceData.attendancePercentage}%
          </Text>
          <VictoryPie
            data={[
              { x: 'Attended', y: attendanceData.attendedClasses },
              {
                x: 'Missed',
                y: attendanceData.totalClasses - attendanceData.attendedClasses,
              },
            ]}
            colorScale={[COLORS.primary, COLORS.warning]}
            height={250}
            width={350}
            innerRadius={50}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            labelRadius={80}
          />

          <Text style={styles.totalClasses}>
            Total Classes: {attendanceData.totalClasses}
          </Text>
        </View>
      ) : (
        <Text>Loading attendance data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#292929',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
  },
  percentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  totalClasses: {
    fontSize: 20,
    color: '#696969',
    marginTop: 10,
  },
});

export default ViewAttendance;
