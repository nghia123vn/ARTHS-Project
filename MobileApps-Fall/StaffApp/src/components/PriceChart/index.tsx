import { memo } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

interface PriceChartProps{
  labels:string[];
  priceData:number[];
}
export const PriceChart = memo(function PriceChart(props:PriceChartProps){
  const {labels,priceData} = props;
  const data = {
    labels: labels || ['0', '0', '0', '0', '0', '0'],
    datasets: [
      {
        data: priceData || [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
  };
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: false // optional
  };
  return (
    <LineChart
      withDots={false}
      withOuterLines={false}
      withVerticalLines={false}
      // withInnerLines={false}
      bezier
      yAxisSuffix="$"
      yAxisInterval={1}
      data={data}
      width={width}
      height={220}
      chartConfig={chartConfig}
    />
  )
})
const width = Dimensions.get('window').width
