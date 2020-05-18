import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import styled from 'styled-components'


export default class App extends Component {

    render() {

        return(
            <Graphs>
                <br />
                <br />
                <br />
                <br />
                <h1 className='header'>Статистика</h1>
                <div>
                    {/* <Line
                        options={{
                            responsive: true
                        }}
                        data={this.state.data}
                    /> */}
                    {/* <canvas id="bar-chart" width="800" height="450"></canvas> */}
                </div>
            </Graphs>
        )
    }
}

const Graphs = styled.div`

    position: relative;

    .header {
        margin-right: 10rem;
        text-align: center;
    }

`