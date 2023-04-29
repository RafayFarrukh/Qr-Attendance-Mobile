import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from '../../api/axiosInstance';
import { COLORS, ROUTES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Wallet = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/course/teacher/showAllCourses/student')
      .then((res) => {
        setCourses(res.data.courseList);
        console.log(res.data.courseList.map((item)=>item._id))
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Ionicons name="ios-school" size={28}  color={COLORS.primary} /> My Courses
      </Text>
      {courses.map((course) => (
        <TouchableOpacity 
          key={course._id} 
          style={styles.courseContainer}
          onPress={() => navigation.navigate('ViewAttendance', { courseId: course._id })}
        >
          <Text style={styles.courseName}>{course.Course._id.courseName}</Text>
          <View style={styles.infoContainer}>
            <Ionicons name="ios-barcode" size={16} color={COLORS.primary} />
            <Text style={styles.courseCode}>
              {course.Course._id.courseCode}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="ios-person" size={16} color={COLORS.primary} />
            <Text style={styles.teacherEmail}>
              {course.teacher.email}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="ios-people" size={16} color={COLORS.primary} />
            <Text style={styles.studentCount}>
              {course.students.length} Students
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  courseContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292929',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  courseCode: {
    fontSize: 16,
    color: '#696969',
    marginLeft: 5,
  },
  teacherEmail: {
    fontSize: 16,
    color: '#696969',
    marginLeft: 5,
  },
  studentCount: {
    fontSize: 16,
    color: '#696969',
    marginLeft: 5,
  },
});

export default Wallet;