import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import Table from 'react-bootstrap/Table'

import './Auth.css';


const NewAuth = () => {

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            role: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const [loadedUsers, setLoadedUsers] = useState();


    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/name');

                setLoadedUsers(responseData.users);
            } catch (err) {

            }
        };
        fetchUsers();

    }, [sendRequest]);

    const history = useHistory();

    const authSubmitHandler = async event => {

        event.preventDefault();
        try {
            const responseData = await sendRequest('http://localhost:5000/api/users/signup',
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    role: formState.inputs.role.value
                }),
                {
                    'Content-type': 'application/json'
                }
            );
            auth.login(responseData.user.id, responseData.token,responseData.role);
            history.push('/');
        } catch (err) {
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="auth card">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>CREATE NEW USER</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    <Input
                        id='name'
                        element='input'
                        label='Your name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a name.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='email'
                        type="email"
                        label="Email"
                        element="input"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter valid email"
                        onInput={inputHandler}
                    />
                    <Input
                        id='password'
                        element='input'
                        label='Password'
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText='Please enter a valid password.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='role'
                        element='select'
                        label='Role'
                        validators={[VALIDATOR_REQUIRE]}
                        errorText='Please select role'
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid} >
                        SIGNUP
                    </Button>
                </form>
            </Card>
            <Card className="signup">
                <Table striped bordered hover className="signup-table">
                    <thead className="sbody">
                        <tr>
                            <th className="s-col">#</th>
                            <th className="s-col">Name</th>
                            <th className="s-col">E-mail</th>
                            <th className="s-col">Role</th>
                        </tr>
                    </thead>
                    <tbody className="sbody">
                        {loadedUsers && loadedUsers.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td className="s-col">{loadedUsers.indexOf(user) + 1}</td>
                                    <td className="s-col">{user.name}</td>
                                    <td className="s-col">{user.email}</td>
                                    <td className="s-col">{user.role}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card>
        </React.Fragment>);

};

export default NewAuth;
