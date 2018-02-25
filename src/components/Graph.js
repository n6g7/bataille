import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { curveMonotoneX } from '@vx/curve'
import { Group } from '@vx/group'
import { Bar, LinePath } from '@vx/shape'
import { ParentSize } from '@vx/responsive'
import { scaleBand, scaleTime, scaleLinear } from '@vx/scale'
import { extent, max } from 'd3-array'

const Svg = styled.svg`
  height: 100%;
  width: 100%;
`

class Graph extends PureComponent {
  state = {
    barsWidth: 40
  }

  x = {
    bars: p => p.colour,
    lines: d => d.round
  }
  y = d => d.cards

  render () {
    const { series, size } = this.props
    const { barsWidth } = this.state

    return <ParentSize>
      {({ width, height }) => {
        // scales
        const xScale = {
          bars: scaleBand({
            rangeRound: [width-barsWidth, width],
            domain: series.map(this.x.bars),
            padding: 0.1,
          }),
          lines: scaleLinear({
            range: [0, width-barsWidth],
            domain: [0, max(series[0].data, this.x.lines)],
          })
        }
        const yScale = scaleLinear({
          range: [height, 0],
          domain: [0, size],
        })

        return <Svg>
          <Group>
            {series.map((player, i) =>
              <LinePath
                key={i}
                data={player.data}
                xScale={xScale.lines}
                yScale={yScale}
                x={this.x.lines}
                y={this.y}
                stroke={player.colour}
                strokeWidth={2}
                curve={curveMonotoneX}
              />
            )}
          </Group>
          <Group>
            {series.map((player, i) => {
              if (player.data.length === 0) return null
              const value = player.data[player.data.length-1]
              const barHeight = height - yScale(this.y(value))

              return <Bar
                key={i}
                width={xScale.bars.bandwidth()}
                height={barHeight}
                x={xScale.bars(player.colour)}
                y={height - barHeight}
                fill={player.colour}
              />
            })}
          </Group>
        </Svg>
      }}
    </ParentSize>
  }
}

export default Graph
