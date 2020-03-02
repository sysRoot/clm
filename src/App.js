import React, { useState } from "react";
import {
    Card,
    Container,
    Button,
    Form,
    Message,
    FormGroup
} from "semantic-ui-react";
import { useFirebase } from "react-redux-firebase";

import "./App.css";

function App() {
    const [email, setEmail] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [concern, setConcern] = useState("");

    const [hasSucceeded, setSucceeded] = useState(false);
    const [completed, setCompleted] = useState(false);

    const firebase = useFirebase();
    const options = [
        { key: "concessions", text: "Concessions", value: "Concessions" },
        { key: "games", text: "Games", value: "Games" },
        { key: "patron", text: "Patron", value: "Patron" },
        { key: "rides", text: "Rides", value: "Rides" },
        {
            key: "sales-and-marketing",
            text: "Sales and Marketing",
            value: "Sales and Marketing"
        }
    ];
    const changeFirstHandler = e => {
        setFirst(e.target.value);
    };
    const changeLastHandler = e => {
        setLast(e.target.value);
    };
    const changeEmailHandler = e => {
        setEmail(e.target.value);
    };
    const changeConcernHandler = (e, { value }) => {
        e.preventDefault();
        setConcern(value);
    };
    const submitEmail = e => {
        e.preventDefault();

        if (hasSucceeded) {
            setSucceeded(false)
            setCompleted(true)
        } else if (!hasSucceeded && !completed){
            return (
                firebase.push("users", {
                    first: first,
                    last: last,
                    concern: concern,
                    email: email
                }) && setSucceeded(true)
            );
        }
    };

    return (
        <Container className="App">
            <Container text className="topBox">
                <img src="/clm.png" alt="Logo" className="logo" />
                <Card fluid className="topCard">
                    <Card.Content header="# Carnival Lives Matter" />
                    <Card.Content
                        description={`Due to the decline in recent years of the carnival industry, we are reaching out to you to secure your support for this movement. Carnival Lives Matter, and we are looking to keep in touch with you possibly in the not so distant future. Use the quick form below to add your name to our list and we will be in contact.`}
                    />
                </Card>
            </Container>
            <Container text>
                <Form
                    className="form-Override"
                    success={hasSucceeded}
                    error={completed}
                    onSubmit={submitEmail}
                >
                    <FormGroup widths="equal">
                        <Form.Input
                            className="input"
                            fluid
                            label="First"
                            onChange={changeFirstHandler}
                            placeholder="Joe"
                        />
                        <Form.Input
                            className="input"
                            fluid
                            label="Last"
                            onChange={changeLastHandler}
                            placeholder="Schmoe"
                        />
                    </FormGroup>
                    <Form.Input
                        className="input"
                        label="Email"
                        onChange={changeEmailHandler}
                        placeholder="joe@schmoe.com"
                    />
                    <Form.Select
                        fluid
                        label="Concern"
                        options={options}
                        placeholder="Concern"
                        onChange={changeConcernHandler}
                    />
                    <Message
                        success
                        header="Form Completed"
                        content="You're all set"
                    />
                    <Message
                        error
                        header="You've already completed the form"
                        content="You only need to click once"
                    />
                    <Button onSubmit={submitEmail}>Submit</Button>
                </Form>
            </Container>
        </Container>
    );
}

export default App;
