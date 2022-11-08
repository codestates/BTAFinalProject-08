import styled from 'styled-components'
import { buttonColor, defaultColor, defaultText } from '../../../utils/color'
import React, { useEffect, useState } from 'react'
import { Area } from '@ant-design/plots'
import { useQuery } from 'react-query'
import { getChartPrice } from '../../../api/blockchain'

const CardGraph = styled.div`
    width: 60%;
    height: 240px;
`
const WrapGraph = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px 10px 0 10px;
`
const GraphHeader = styled.div`
    width: 100%;
    height: 15%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
`
const GraphButtonWrap = styled.div`
    width: 40%;
    height: 100%;
    border-radius: 10px;
    background-color: #f5f5f5;
    padding: 4px;
    display: flex;
    justify-content: space-between;
`
const GraphButton = styled.div`
    background-color: ${(props) => (props.off ? '#f5f5f5' : `${buttonColor}`)};
    color: ${(props) => (props.off ? `${defaultColor}` : '#f5f5f5')};
    border-radius: 10px;
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const GraphContent = styled.div`
    width: 100%;
    height: 85%;
`

const HomeCardFirstRowGraph = () => {
    const [toggle, setToggle] = useState(false)
    const { data, isLoading } = useQuery(['price'], getChartPrice, {
        refetchInterval: 1000000,
    })
    let price = []
    let volume = []

    if (data?.prices) {
        data.prices.map((v, i) => {
            var date = new Date(v[0]).toLocaleDateString()
            var scales = v[1]
            price.push({
                Date: date,
                scales: scales,
            })
        })
    }
    if (data?.total_volumes) {
        data.total_volumes.map((v, i) => {
            var date = new Date(v[0]).toLocaleDateString()
            var scales = v[1]
            volume.push({
                Date: date,
                scales: scales,
            })
        })
    }

    const config = {
        xField: 'Date',
        yField: 'scales',
        line: { color: '#9c6cff' },
        xAxis: {
            range: [0, 1],
            tickCount: 5,
        },
        yAxis: false,
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#9f86d1 1:#9c6cff',
            }
        },
    }

    //<Area style={{ height: '100%' }} {...config} />
    return (
        <CardGraph>
            <WrapGraph>
                <GraphHeader>
                    <GraphButtonWrap>
                        <GraphButton
                            off={toggle}
                            onClick={() => setToggle(false)}
                        >
                            Price
                        </GraphButton>
                        <GraphButton
                            off={!toggle}
                            onClick={() => setToggle(true)}
                        >
                            Volume
                        </GraphButton>
                    </GraphButtonWrap>
                </GraphHeader>
                <GraphContent>
                    {!toggle ? (
                        <Area
                            loading={isLoading}
                            data={price}
                            style={{ height: '90%' }}
                            {...config}
                        />
                    ) : (
                        <Area
                            loading={isLoading}
                            data={volume}
                            style={{ height: '90%' }}
                            {...config}
                        />
                    )}
                </GraphContent>
            </WrapGraph>
        </CardGraph>
    )
}

export default React.memo(HomeCardFirstRowGraph)
