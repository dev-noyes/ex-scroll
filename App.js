import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Animated, Image } from "react-native";
import { faker } from "@faker-js/faker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const DATA = Array.from({ length: 30 }).map((item, index) => {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
});
export default function App() {
  const scrollY = new Animated.Value(0);

  const renderItem = ({ item, index }) => {
    const opacity = scrollY.interpolate({
      inputRange: [-1, 0, index * hp(10), (index + 2) * hp(10)],
      outputRange: [1, 1, 1, 0],
      extrapolate: "clamp",
    });
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, index * hp(10), (index + 2) * hp(10)],
      outputRange: [1, 1, 1, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          flexDirection: "row",
          width: wp(90),
          height: hp(10),
          borderRadius: 10,
          backgroundColor: "#ddd",
          marginHorizontal: wp(5),
          marginBottom: hp(1),
          opacity: opacity,
          transform: [
            {
              scale: scale,
            },
          ],
        }}
      >
        <View style={{ width: wp(30), justifyContent: "center" }}>
          <Image style={{ marginHorizontal: wp(3), borderRadius: 100, width: hp(8), height: hp(8) }} source={{ uri: item.avatar }} />
        </View>
        <View style={{ paddingHorizontal: wp(3), width: wp(60), justifyContent: "center" }}>
          <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>{item.username}</Text>
          <Text numberOfLines={2} style={{ fontSize: hp(1.3), color: "#aaa" }}>
            {item.email}
          </Text>
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: hp(10),
    alignItems: "center",
    justifyContent: "center",
  },
});
