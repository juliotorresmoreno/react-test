import React, { Component } from 'react';
import { actionsCreators } from './servicio';
import { connect } from 'react-redux';

const mapProps = (state) => ({
    show: state.show,
    message: state.message,
    data: state.data
});


export default connect(mapProps, actionsCreators)(class App extends Component {
    state = {
        name: ''
    };
    handleChange = ({ target }) =>
        this.setState({
            [target.name]: target.value
        });
    handleSaludar = () => {
        const { name } = this.state;
        const { saludar } = this.props;
        saludar(name);
    }
    handleOcultar = () => {
        const { ocultar } = this.props;
        ocultar();
    }
    handleConsultar = () => {
        const { consultar } = this.props;
        consultar();
    }
    render() {
        const { name } = this.state;
        const { data } = this.props;
        return (
            <div>
                <div>
                    <input type='text' name='name' value={name} onChange={this.handleChange} />
                    {this.props.show ? (
                        <div style={{ color: 'red' }}>Hola {this.props.message}</div>
                    ) : false}
                    <br />
                    {data.length ? <table>
                        <thead>
                            <tr>
                                <th>index</th>
                                <th>value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((v, i) => (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{v}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>: false}
                    Name: {name}<br />
                    {JSON.stringify(data)}
                </div>
                <br />
                <br />
                <button onClick={this.handleSaludar}>Saludar</button>&nbsp;&nbsp;
                <button onClick={this.handleOcultar}>Ocultar</button>&nbsp;&nbsp;
                <button onClick={this.handleConsultar}>Consultar</button>&nbsp;&nbsp;
            </div>
        );
    }
});
