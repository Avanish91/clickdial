// components/PieChart.js

import React from 'react';
import { Platform } from 'react-native';
import { Svg } from 'react-native-svg';
import { VictoryPie } from 'victory-native';

const PieChart = ({ data, selectedCategory, onSelect, size = 250 }) => {
  const colors = data.map(d => d.color);

  const chart = (
    <VictoryPie
      {...(Platform.OS !== 'ios' && { standalone: false })}
      data={data}
      labels={({ datum }) => `${datum.y}`}
      radius={({ datum }) =>
        selectedCategory?.name === datum.name ? size / 2 : size / 2 - 10
      }
      innerRadius={30}
      labelRadius={({ innerRadius }) => (size + innerRadius) / 3.5}
      style={{
        labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' },
        data: { stroke: '#fff', strokeWidth: 1 },
      }}
      width={size}
      height={size}
      colorScale={colors}
      events={[
        {
          target: 'data',
          eventHandlers: {
            onPress: () => [
              {
                target: 'labels',
                mutation: ({ index }) => {
                  const categoryName = data[index].name;
                  onSelect(categoryName);
                  return null;
                },
              },
            ],
          },
        },
      ]}
    />
  );

  return Platform.OS === 'ios'
    ? chart
    : <Svg width={size} height={size}>{chart}</Svg>;
};

export default PieChart;
