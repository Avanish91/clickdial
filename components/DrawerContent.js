import React from 'react';
import { ImageBackground, Image, Alert } from 'react-native';
import { View } from 'react-native';
import { Drawer, Text } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../components/context/Context';

import Images from '../assets/images/index';
import styles from '../assets/css/index';
import DeviceInfo from 'react-native-device-info';
import '../services/global';

export function DrawerContent(props) {
  const appVersion = DeviceInfo.getVersion();
  const { signOut } = React.useContext(AuthContext);

  function signOutFunc() {
    signOut();
    props.navigation.toggleDrawer();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.backgroundScreen.backgroundMenu}
        style={[styles.menuBackground]}
      >
        <DrawerContentScrollView {...props}>
          <View style={[styles.drawerContent]}>
            <View style={[styles.userInfoSection]}>
              <Image source={Images.logo.whiteLogo} style={styles.drawerLogo} />
              <View
                style={[
                  styles.titleContainer,
                  {
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                    paddingLeft: 10,
                  },
                ]}
              >
                <Text style={styles.titleLabel}>Hello,</Text>
                <Text style={styles.titleName}>{global.vName}</Text>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.dashboardIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Dashboard"
                onPress={() =>
                  props.navigation.navigate('Drawer Dashboard', {
                    screen: 'Dashboard',
                  })
                }
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.profileIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Profile"
                onPress={() => {
                  props.navigation.navigate('Drawer Dashboard', {
                    screen: 'Profile',
                  })
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.answerIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Answer Work"
                onPress={() => {
                  props.navigation.navigate('Drawer Dashboard', {
                    screen: 'Answer',
                  })
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.pendingIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Pending Work"
                onPress={() => {
                  props.navigation.navigate('Drawer Dashboard', {
                    screen: 'Pending',
                  })
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.cancelIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Cancel Work"
                onPress={() => {
                  props.navigation.navigate('Drawer Dashboard', {
                    screen: 'Cancel',
                  })
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.completeIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Complete Work"
                onPress={() => {
                  props.navigation.navigate('Drawer Dashboard', {
                    screen: 'Complete',
                  })
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.walletIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Wallet"
                onPress={() => {
                  props.navigation.navigate('Drawer Dashboard', {
                    screen: 'Wallet',
                  })
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                icon={() => (
                  <Image
                    source={Images.menuIcons.logoutIcon}
                    style={styles.drawerIcon}
                  />
                )}
                label="Logout"
                onPress={() => {
                  signOutFunc();
                }}
              />
            </Drawer.Section>
            <View>
              <Text style={{ color: '#a9a9a9', fontSize: 12, paddingLeft: 15 }}>
                Version : {appVersion}
              </Text>
            </View>
          </View>
        </DrawerContentScrollView>
      </ImageBackground>
    </View>
  );
}
