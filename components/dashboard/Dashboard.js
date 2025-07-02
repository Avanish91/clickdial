import React, { useEffect, useState } from 'react';
import { View, ImageBackground, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Text, Image, Modal, TouchableHighlight, Alert,req } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Dash from 'react-native-dash';
import PieChart from 'react-native-pie-chart';
import Toast from 'react-native-tiny-toast';

import Loader from "../loader/loader";
import '../../services/global';
import Images from '../../assets/images/index';
import AppTexts from '../../assets/text/index';
import styles from '../../assets/css/index';
import { TextInput } from 'react-native-gesture-handler';

const Dashboard = ({ navigation }) => {
    const [didMount, setDidMount] = useState(false); 
    const [color, setColor] = useState(['#4CAF50','#F44336']);
    const [checkloader, setcheckloader] = useState(true);
    const [dashboardData, setDashboardData] = useState([]);
    const [Data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const chart_wh = 170
    var LabelList = [];
    for (let i = 0; i < 2; i++) {
        LabelList.push(
            <View style={[styles.dashboardChartLabelContainer]} key={i}>
                <View style={{ width: 5, height: 5, borderRadius: 8, backgroundColor: color[i] }}></View>
                <Text style={styles.dashboardChartLabelTextOne}>{i===0?'Complete':'Cancel'}</Text>
                <Text style={styles.dashboardChartLabelTextTwo}>{Data[i]-1} %</Text>
            </View>
        );
        // }
       // Data.push(persons[i].percent)
    }


    const url=global.url+global.dashboard;

    const getDashboardDetail = () =>{
        console.log("getDashboard")
      axios.post(url, {'vId': global.vId,'deviceId': global.deviceId})
      .then(res => {
        const test=[];
        const dsData = res.data;
        const complete=dsData.gComplete;
        const cancel=dsData.gCancel;
          setDashboardData(dsData);
          test.push(complete>0?complete:1);
          test.push(cancel>0?cancel:1);
          console.log(test);
          setData(test);
          setcheckloader(false);
      })
      .catch(error => {
          Toast.show("! Ooops,Please Check Newtwok !");
      });
    }
   useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('hello use effet');
            getDashboardDetail();
          });
          return unsubscribe;
        }, [navigation]);     

    return (
        <SafeAreaView style={styles.container}>
            <Loader load={checkloader} />
            <ScrollView style={styles.scrollView}>
            <View style={[styles.container,{height:765}]}>
                <StatusBar hidden={true} />
                <View style={styles.editPagesMainContainer}>
                <View style={styles.Margin}></View>
                <View style={[styles.dashboardBoxContainer,{height:182,paddingTop:0}]}>
                    <View style={[styles.dashboardChartMainContainer,{height:180}]}>
                        <View style={[styles.dashboardChartContainer,{height:180}]}>
                            <PieChart
                                chart_wh={chart_wh}
                                series={Data}
                                sliceColor={color}
                                doughnut={true}
                                coverRadius={0.45}
                                coverFill={'#FFF'}
                            />
                        </View>
                            <View style={[styles.dashboardChartLabelMainContainer]}>
                                <ScrollView nestedScrollEnabled={true} >
                                    <ScrollView nestedScrollEnabled={true} horizontal={true}>
                                        <View style={[styles.dashboardChartLabelMainContainerLeft]}>
                                            {LabelList}
                                        </View>
                                    </ScrollView>
                                </ScrollView>
                            </View>
                        </View>
                </View>
                <View style={styles.Margin}></View>
                <View style={[styles.dashboardBoxContainer,{height:192,paddingTop:0}]} >
                    <View style={[{justifyContent:'center',alignItems:'center',height:30}]}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>Today</Text>
                    </View>
                    <View style={[{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}]}>
                        <View style={[{width:'50%',justifyContent:'center',alignItems:'center',height:50}]}>
                            <Text style={{fontSize:16}}>New Enquiry</Text>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{dashboardData.tNew}</Text>
                        </View>
                        <View style={[{width:'50%',justifyContent:'center',alignItems:'center',height:50}]}>
                            <Text style={{fontSize:16}}>Re-Complaint</Text>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{dashboardData.tRecomp}</Text>
                        </View>
                    </View>
                    <Dash style={{ width: '100%', height: 1 }} dashColor={'#dbdbdb'} />
                    <View style={[{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}]}>
                        <View style={[{width:'50%',justifyContent:'center',alignItems:'center',height:50}]}>
                            <Text style={{fontSize:16}}>Answer</Text>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{dashboardData.tAnswer}</Text>
                        </View>
                        <View style={[{width:'50%',justifyContent:'center',alignItems:'center',height:50}]}>
                            <Text style={{fontSize:16}}>Pending</Text>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{dashboardData.tPending}</Text>
                        </View>
                    </View>
                    <Dash style={{ width: '100%', height: 1 }} dashColor={'#dbdbdb'} />                    
                    <View style={[{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}]}>
                        <View style={[{width:'50%',justifyContent:'center',alignItems:'center',height:50}]}>
                            <Text style={{fontSize:16}}>Complete</Text>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{dashboardData.pComplete}</Text>
                        </View>
                        <View style={[{width:'50%',justifyContent:'center',alignItems:'center',height:50}]}>
                            <Text style={{fontSize:16}}>Cancel</Text>
                            <Text style={{fontWeight:'bold',fontSize:18}}>{dashboardData.pCancel}</Text>
                        </View>
                    </View>
                </View>

                    <View style={[styles.dashboardTabs,{height:100,width:'100%',flexDirection:'row',flexWrap:'wrap'}]}>
                        <TouchableOpacity  style={[{width:'48%',height:100,margin:'1%'}]} onPress={() => {navigation.navigate('NewWork')}}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[-0.3,1.11]}
                                useAngle={true}
                                angle={278}
                                colors={['#16b4eb','#23e73c' ]}
                                style={[styles.dashboardLinearTabsContainer]}
                            >
                                <View style={{}}>
                                    <View style={styles.dashboardLinearTabsLeft}>
                                        <View style={styles.dashboardGradientTabs}>
                                        <Image
                                                source={Images.menuIcons.enquiryIcon}
                                                style={[styles.drawerIcon]}
                                            />
                                        </View>
                                        <Text style={styles.dashboardLinearTabsLeftTextOne}>New Enquiry</Text>
                                        <Text style={styles.dashboardLinearTabsLeftTextTwo}>{dashboardData.dNew}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[{width:'48%',height:100,margin:'1%'}]} onPress={() => {navigation.navigate('Wallet')}}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[-0.2,0.9]}
                                useAngle={true}
                                angle={77}
                                colors={['#c548ab', '#635bff']}
                                style={[styles.dashboardLinearTabsContainer]}
                            >
                                <View style={{}}>
                                    <View style={styles.dashboardLinearTabsLeft}>
                                        <View style={styles.dashboardGradientTabs}>
                                            <Image
                                                source={Images.menuIcons.walletIcon}
                                                style={[styles.drawerIcon]}
                                            />
                                        </View>
                                        <Text style={styles.dashboardLinearTabsLeftTextOne}>Wallet</Text>
                                        <Text style={styles.dashboardLinearTabsLeftTextTwo}>{dashboardData.dAmount}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[{width:'48%',height:100,margin:'1%'}]} onPress={() => {navigation.navigate('Answer')}}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[-0.45,1.02]}
                                useAngle={true}
                                angle={253}
                                colors={[ '#61b7fa', '#425daf']}
                                style={[styles.dashboardLinearTabsContainer]}
                            >
                                <View style={{}}>
                                    <View style={styles.dashboardLinearTabsLeft}>
                                        <View style={styles.dashboardGradientTabs}>
                                            <Image
                                                source={Images.menuIcons.answerIcon}
                                                style={[styles.drawerIcon]}
                                            />
                                        </View>
                                        <Text style={styles.dashboardLinearTabsLeftTextOne}>Answer</Text>
                                        <Text style={styles.dashboardLinearTabsLeftTextTwo}>{dashboardData.dAnswer}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[{width:'48%',height:100,margin:'1%'}]} onPress={() => {navigation.navigate('Pending')}}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[0.10, 1 ]}
                                useAngle={true}
                                angle={79}
                                colors={['#fad961','#d68408']}
                                style={[styles.dashboardLinearTabsContainer]}
                            >
                                <View style={{}}>
                                    <View style={styles.dashboardLinearTabsLeft}>
                                        <View style={styles.dashboardGradientTabs}>
                                            <Image
                                                source={Images.menuIcons.pendingIcon}
                                                style={[styles.drawerIcon]}
                                            />
                                        </View>
                                        <Text style={styles.dashboardLinearTabsLeftTextOne}>Pending</Text>
                                        <Text style={styles.dashboardLinearTabsLeftTextTwo}>{dashboardData.dPending}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[{width:'48%',height:100,margin:'1%'}]} onPress={() => {navigation.navigate('Cancel')}}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[ 0.104, -0.45]}
                                useAngle={true}
                                angle={258}
                                colors={['#fad961','#d68408']}
                                style={[styles.dashboardLinearTabsContainer]}
                            >
                                <View style={{}}>
                                    <View style={styles.dashboardLinearTabsLeft}>
                                        <View style={styles.dashboardGradientTabs}>
                                            <Image
                                                source={Images.menuIcons.cancelIcon}
                                                style={[styles.drawerIcon]}
                                            />
                                        </View>
                                        <Text style={styles.dashboardLinearTabsLeftTextOne}>Cancel</Text>
                                        <Text style={styles.dashboardLinearTabsLeftTextTwo}>{dashboardData.dCancel}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity  style={[{width:'48%',height:100,margin:'1%'}]} onPress={() => {navigation.navigate('Complete')}}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[-0.33, 1 ]}
                                useAngle={true}
                                angle={79}
                                colors={['#304352', '#d7d2cc']}
                                style={[styles.dashboardLinearTabsContainer]}
                            >
                                <View style={{}}>
                                    <View style={styles.dashboardLinearTabsLeft}>
                                        <View style={styles.dashboardGradientTabs}>
                                          <Image
                                                source={Images.menuIcons.completeIcon}
                                                style={[styles.drawerIcon]}
                                            />
                                        </View>
                                        <Text style={styles.dashboardLinearTabsLeftTextOne}>Complete</Text>
                                        <Text style={styles.dashboardLinearTabsLeftTextTwo}>{dashboardData.dComplete}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default Dashboard