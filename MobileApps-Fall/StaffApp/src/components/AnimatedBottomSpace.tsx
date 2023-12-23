import React,{ memo } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedSafeAreaInsets } from "react-native-safe-area-context";

export const AnimatedBottomSpace =memo(function({color}: {color?: string}){
  const {aBottom}= useAnimatedSafeAreaInsets()
  const animatedStyle = useAnimatedStyle(()=>{
    return{
      height:aBottom.value
    }
  }, [])
  return (
    <Animated.View style={[{backgroundColor: color}, animatedStyle]}/>
  )
})

export const AnimatedStatusBar = memo(({color}: {color?: string}) => {
  const {aTop}= useAnimatedSafeAreaInsets()
  const animatedStyle = useAnimatedStyle(()=>{
    return{
      height:aTop.value
    }
  }, [])
  return (
    <Animated.View style={[{backgroundColor: color}, animatedStyle]}/>
  )
})
