import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Radio, Button } from 'antd';
import { registerUser } from "variables/firebase";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
    const [state, setState] = React.useState({
        email: "",
        password: ""
    });
    const [creds, setCreds] = React.useState({});
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Form values:', values);
        setIsModalOpen(false)
        setCreds(values)
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleReload = () => {
        window.location.reload(); // Full page reload
      };

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();

        setLoading(true)
        const { email, password } = state;
        try {
            await registerUser(state.email, state.password, creds)
            setLoading(false)
            alert(`You are login with email: ${email} and password: ${password}`);
            handleReload()
            navigate("/")
        } catch (error) {
            alert(error)
        }

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit}>
                <h1>Sign up</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-google-plus-g" />
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                </div>
                <span>or use your account</span>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />

                <a href="#" onClick={showModal}><span style={{ color: "red" }}>*</span> Add census info</a>
                <button type="submit">{loading ? "Registering..." : "Sign Up"}</button>
            </form>

            <Modal title="Census Info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="placeOfBirth" label="Place of Birth">
                        <Input />
                    </Form.Item>
                    <Form.Item name="fullName" label="Full Name">
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="dateOfBirth" label="Date of Birth">
                        <DatePicker />
                    </Form.Item> */}
                    <Form.Item name="age" label="Age">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="isAbove21" label="Are you above 21?">
                        <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="gender" label="Gender">
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                            <Radio value="other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default SignUpForm;
