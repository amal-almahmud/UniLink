import { useState } from "react";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import "./Register.css";

function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        major: "",
        academicLevel: "",
        acceptedTerms: false,
    });

    const [errors, setErrors] = useState({});

    function updateField(event) {
        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};
        const universityEmailPattern =
            /^[^\s@]+@kfupm\.edu\.sa$/i;

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName =
                "Full name must contain at least 2 characters.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "University email is required.";
        } else if (
            !universityEmailPattern.test(formData.email.trim())
        ) {
            newErrors.email =
                "Please use your KFUPM university email.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 2) {
            newErrors.password =
                "Password must contain at least 2 characters.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";
        } else if (
            formData.confirmPassword !== formData.password
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";
        }

        if (!formData.major) {
            newErrors.major = "Please select your major.";
        }

        if (!formData.academicLevel) {
            newErrors.academicLevel =
                "Please select your academic level.";
        }

        if (!formData.acceptedTerms) {
            newErrors.acceptedTerms =
                "You must agree to the Terms and Conditions.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(formData);
        }
    }

    return (
        <div className="register-page">
            <section className="register-intro">
                <div className="register-logo">
                    <span className="register-logo-icon">U</span>
                    <span>UniLink</span>
                </div>

                <div className="register-intro-content">
                    <p className="register-intro-eyebrow">
                        Built for KFUPM students
                    </p>

                    <h1>
                        One campus.
                        <br />
                        More possibilities.
                    </h1>

                    <p className="register-description">
                        Discover meaningful opportunities, find the right teammates,
                        and build your university experience together.
                    </p>
                </div>
            </section>

            <main className="register-main">
                <div className="register-container">
                    <p className="register-form-eyebrow">
                        CREATE YOUR ACCOUNT
                    </p>

                    <h2>Join UniLink</h2>

                    <p className="register-subtitle">
                        Your account gives you access to every student,
                        team leader, and publisher function.
                    </p>

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <Input
                            label="Full Name"
                            name="fullName"
                            placeholder="Student Name"
                            value={formData.fullName}
                            onChange={updateField}
                            error={errors.fullName}
                            required
                        />

                        <Input
                            label="University Email"
                            name="email"
                            type="email"
                            placeholder="s20xxxxxx@kfupm.edu.sa"
                            value={formData.email}
                            onChange={updateField}
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={updateField}
                            error={errors.password}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={updateField}
                            error={errors.confirmPassword}
                            required
                        />

                        <Select
                            label="Major"
                            name="major"
                            value={formData.major}
                            onChange={updateField}
                            error={errors.major}
                            required
                        >
                            <option value="" disabled hidden>
                                Select major
                            </option>

                            <option value="accounting">
                                Accounting
                            </option>

                            <option value="accounting-corporate-finance">
                                Accounting and Corporate Finance
                            </option>

                            <option value="actuarial-science-financial-mathematics">
                                Actuarial Science and Financial Mathematics
                            </option>

                            <option value="aerospace-engineering">
                                Aerospace Engineering
                            </option>

                            <option value="applied-mathematics-ai">
                                Applied Mathematics and AI
                            </option>

                            <option value="architecture">
                                Architecture
                            </option>

                            <option value="architectural-engineering">
                                Architectural Engineering
                            </option>

                            <option value="artificial-intelligence-cybersecurity">
                                Artificial Intelligence and Cybersecurity
                            </option>

                            <option value="bioengineering">
                                Bioengineering
                            </option>

                            <option value="business-analytics-ai">
                                Business Analytics and Artificial Intelligence
                            </option>

                            <option value="chemical-engineering">
                                Chemical Engineering
                            </option>

                            <option value="chemistry">
                                Chemistry
                            </option>

                            <option value="civil-engineering">
                                Civil Engineering
                            </option>

                            <option value="computer-engineering">
                                Computer Engineering
                            </option>

                            <option value="computer-science">
                                Computer Science
                            </option>

                            <option value="control-instrumentation-engineering">
                                Control and Instrumentation Engineering
                            </option>

                            <option value="data-science-engineering">
                                Data Science and Engineering
                            </option>

                            <option value="digital-social-media-marketing">
                                Digital and Social Media Marketing
                            </option>

                            <option value="electrical-engineering">
                                Electrical Engineering
                            </option>

                            <option value="electrical-engineering-physics">
                                Electrical Engineering and Physics
                            </option>

                            <option value="environmental-science-engineering">
                                Environmental Science and Engineering
                            </option>

                            <option value="finance">
                                Finance
                            </option>

                            <option value="finance-financial-engineering">
                                Finance and Financial Engineering
                            </option>

                            <option value="fintech-entrepreneurship">
                                FinTech and Entrepreneurship
                            </option>

                            <option value="geology">
                                Geology
                            </option>

                            <option value="geophysics">
                                Geophysics
                            </option>

                            <option value="human-resource-management">
                                Human Resource Management
                            </option>

                            <option value="industrial-systems-engineering">
                                Industrial and Systems Engineering
                            </option>

                            <option value="integrated-design">
                                Integrated Design
                            </option>

                            <option value="management">
                                Management
                            </option>

                            <option value="management-information-systems">
                                Management Information Systems
                            </option>

                            <option value="marketing">
                                Marketing
                            </option>

                            <option value="materials-science-engineering">
                                Materials Science and Engineering
                            </option>

                            <option value="mathematics">
                                Mathematics
                            </option>

                            <option value="mechanical-engineering">
                                Mechanical Engineering
                            </option>

                            <option value="mining-science-engineering">
                                Mining Science and Engineering
                            </option>

                            <option value="operations-supply-chain">
                                Operations and Supply Chain
                            </option>

                            <option value="petroleum-engineering">
                                Petroleum Engineering
                            </option>

                            <option value="physics">
                                Physics
                            </option>

                            <option value="semiconductor-design-engineering">
                                Semiconductor Design and Engineering
                            </option>

                            <option value="smart-sustainable-cities">
                                Smart and Sustainable Cities
                            </option>

                            <option value="software-engineering">
                                Software Engineering
                            </option>
                        </Select>

                        <Select
                            label="Academic Level"
                            name="academicLevel"
                            value={formData.academicLevel}
                            onChange={updateField}
                            error={errors.academicLevel}
                            required
                        >
                            <option value="">Select academic level</option>
                            <option value="freshman">Freshman</option>
                            <option value="sophomore">Sophomore</option>
                            <option value="junior">Junior</option>
                            <option value="senior">Senior</option>

                        </Select>

                        <div className="register-terms">
                            <label>
                                <input
                                    name="acceptedTerms"
                                    type="checkbox"
                                    checked={formData.acceptedTerms}
                                    onChange={updateField}
                                />

                                <span>
                                    I agree to the Terms and Conditions
                                </span>
                            </label>

                            {errors.acceptedTerms && (
                                <p className="register-terms-error">
                                    {errors.acceptedTerms}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="register-submit"
                        >
                            Create Account
                        </Button>

                        <a
                            className="register-login-link"
                            href="/login"
                        >
                            Back to Login
                        </a>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Register;