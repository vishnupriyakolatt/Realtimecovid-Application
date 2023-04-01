import { useState, useEffect } from 'react'
import ChatBot from 'react-simple-chatbot';
import PropTypes from 'prop-types';
import chatboticon from '../images/coronaLogo.svg'


const styles = { container: { margin: "1000px auto", alignItems: "center" } }

const CustomResult = (props) => {
    let { beforeMessage, afterMessage, condition1, condition2, condition3 } = props

    //states
    const [age, setage] = useState('')
    const [fever, setfever] = useState('')
    const [RF, setRF] = useState(false)

    useEffect(() => {
        let { steps } = props
        let { age, fever, RF } = steps

        setage(age)
        setfever(fever)
        setRF(RF)

    }, [age, fever, RF])


    //condition1-age checking, condition2-fever checking and condition3-RF checking 

    if (condition3) {
        if (condition1 && (!condition2)) {
            return (<div>
                {(age.value > 65 || RF ? `${beforeMessage} ${afterMessage}` : `${beforeMessage}`)}
            </div>)
        }
        else if ((!condition1) && condition2) {
            return (<div>
                {(fever.value > 40 || RF ? `${beforeMessage} ${afterMessage}` : `${beforeMessage}`)}
            </div>)
        }
        else if ((!condition1) && (!condition2)) {
            return (<div>
                {(RF ? `${beforeMessage} ${afterMessage}` : `${beforeMessage}`)}
            </div>)
        }
        else if (condition1 && condition2) {
            return (<div>
                {(age.value > 65 || fever.value > 40 || RF ? `${beforeMessage} ${afterMessage}` : `${beforeMessage}`)}
            </div>)
        }
    }
    else {
        if (condition1 && (!condition2)) {
            return (<div>
                {(age.value > 65 ? `${beforeMessage} ${afterMessage}` : `${beforeMessage}`)}
            </div>)
        }
        else if ((!condition1) && condition2) {
            return (<div>
                {(fever.value > 40 ? `${beforeMessage} ${afterMessage}` : `${beforeMessage}`)}
            </div>)
        }

        else if (condition1 && condition2) {
            return (<div>
                {(age.value > 65 || fever.value > 40 ? `${beforeMessage} ${afterMessage}` : `${beforeMessage}`)}
            </div>)
        }

    }
}
CustomResult.propTypes = {
    steps: PropTypes.object,
};

CustomResult.defaultProps = {
    steps: undefined,
};
export default function SymptomChecker() {

    return (
        <div style={{ display: "flex", justifyContent: "center" }} >
            <ChatBot botAvatar={chatboticon} floating
                steps={[
                    {
                        id: '0',
                        message: 'Hi, may I help you?',
                        trigger: '0.1',
                    },
                    {
                        id: '0.1',
                        options: [
                            { value: 'yes', label: 'Yes', trigger: '1' },
                            { value: 'no', label: 'No', trigger: '0.2' },
                        ],
                    },
                    {
                        id: '0.2',
                        message: 'Ok.',
                        end: true,
                    },
                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Ok {previousValue}, what is your gender',
                        trigger: '4',
                    },

                    {
                        id: '4',
                        options: [
                            { value: 'male', label: 'Male', trigger: '5' },
                            { value: 'female', label: 'Female', trigger: '5' },
                        ],
                    },

                    {
                        id: '5',
                        message: 'How old are you?',
                        trigger: 'age',
                    },
                    {
                        id: 'age',
                        user: true,
                        // validator: (value) => {
                        //     if (isNaN(value)) {
                        //         return 'value must be a number';
                        //     } else if (value < 65) {
                        //         return true;
                        //     }

                        // },
                        trigger: '7',
                    },
                    {
                        id: '7',
                        component: (
                            <div >
                                <h4>Do you have any of the folowing:</h4>
                                <p><ol style={{ marginLeft: "20px" }}>
                                    <li>Diagnosed chronic lung disease</li>
                                    <li>History of heart failure</li>
                                    <li>Current Cancer</li>
                                    <li>Weakened immune system</li>
                                    <li>History of chronic liver disease</li>
                                    <li>History of kidney failure</li>
                                    <li>Long-term stay at a care facility or nursing home</li>
                                </ol></p>
                            </div>
                        ),
                        trigger: 'RF',

                    },
                    {
                        id: 'RF',
                        options: [
                            { value: true, label: 'Yes', trigger: '9' },
                            { value: false, label: 'No', trigger: '9' },
                        ],
                    },
                    {
                        id: '9',
                        component: (
                            <div >
                                <h4>Do you have any of the folowing symptoms? Please select symptoms that are not related to any chronic disease you may be subject to.</h4>
                                <p><ol style={{ marginLeft: "20px" }}>
                                    <li>Fever</li>
                                    <li>Cough</li>
                                    <li>Shortness of breath</li>

                                </ol></p>
                            </div>
                        ),
                        trigger: '10'
                    },
                    {
                        id: '10',
                        options: [
                            { value: 1, label: 'no fever & shortness of breath', trigger: '11' },
                            { value: 2, label: 'cough ', trigger: '12' },

                            { value: 3, label: 'fever ', trigger: '13' },
                            { value: 4, label: 'fever and shortness of breath ', trigger: '14' },

                            { value: 5, label: 'all symptoms ', trigger: '14' },
                            { value: 6, label: 'only fever & cough ', trigger: '15' },

                            { value: 7, label: 'None', trigger: '16' },

                        ],
                    },
                    {
                        id: '11',
                        message: 'Are your symptoms worsening rapidly?',
                        trigger: '11.1',
                    },
                    {
                        id: '11.1',
                        options: [
                            { value: 1, label: 'Yes', trigger: '11.2' },
                            { value: 2, label: 'No', trigger: '11.2' },
                        ],
                    },
                    {
                        id: '11.2',
                        message: 'Are you breathing very fast?',
                        trigger: '11.2optn',
                    },
                    {
                        id: '11.2optn',
                        options: [
                            { value: 1, label: 'Yes', trigger: '11.3' },
                            { value: 2, label: 'No', trigger: '11.3' },
                        ],
                    },
                    {
                        id: '11.3',
                        message: 'Are you coughing up blood?',
                        trigger: '11.4',
                    },
                    {
                        id: '11.4',
                        options: [
                            { value: 1, label: 'Yes', trigger: 'ResEmergency' },
                            { value: 2, label: 'No', trigger: '11.5' },
                        ],
                    },
                    {
                        id: '11.5',
                        component: (
                            <div >
                                <h4>Do you have any of the folowing symptoms? </h4>
                                <p><ol style={{ marginLeft: "20px" }}>
                                    <li>Fatigue</li>
                                    <li>Muscle pain</li>
                                    <li>chills</li>
                                    <li>Headache</li>
                                    <li>Diarrhea</li>
                                    <li>Nausea</li>
                                    <li>Sore throat</li>
                                </ol></p>
                            </div>
                        ),
                        trigger: '11.6'
                    },
                    {
                        id: '11.6',
                        options: [
                            { value: 1, label: 'any(except fatigue)', trigger: '11.6.2' },
                            { value: 2, label: 'fatigue', trigger: '11.6.1' },
                            { value: 3, label: 'none', trigger: '11.6.1' },
                        ],
                    },
                    {
                        id: '11.6.1',
                        component: (
                            <div >
                                <h4>Have you had close contact with a person with suspected COVID-19 infection in the last 14 days? </h4>
                                <ol style={{ marginLeft: "20px" }}>
                                    <li>I live or have care to a person suspected of having COVID-19</li>
                                    <li>I had face to face contact for longer than 15 minutes with a person suspected of having COVID-19</li>
                                    <li>other</li>
                                    <li>None of the above</li>
                                </ol>
                            </div>
                        ),
                        trigger: '11.6.1optns',
                    },
                    {
                        id: '11.6.1optns',
                        options: [
                            { value: 1, label: '1', trigger: 'ResConHlth' },
                            { value: 2, label: '2', trigger: 'ResConHlth' },
                            { value: 3, label: '3', trigger: 'ResConHlth' },
                            { value: 4, label: '4', trigger: 'ResCallDr' },
                            { value: 5, label: '5', trigger: 'ResCallDr' },

                        ],
                    },
                    {
                        id: '11.6.2',
                        component: (
                            <div >
                                <h4> Have you had close contact with a person with suspected COVID-19 infection in the last 14 days? </h4>
                                <ol style={{ marginLeft: "20px" }}>
                                    <li>I live or have care to a person suspected of having COVID-19</li>
                                    <li>I had face to face contact for longer than 15 minutes with a person suspected of having COVID-19</li>
                                    <li>other</li>
                                    <li>None of the above</li>
                                </ol>
                            </div>
                        ),
                        trigger: '11.6.2optns',
                        // end: true,
                    },
                    {
                        id: '11.6.2optns',
                        options: [
                            { value: 1, label: '1', trigger: 'customResult' },
                            { value: 2, label: '2', trigger: 'customResult' },
                            { value: 3, label: '3', trigger: 'customResult' },
                            { value: 4, label: '4', trigger: 'ResCallDr' },
                            { value: 5, label: '5', trigger: 'ResCallDr' },

                        ],
                    },
                    {
                        id: 'customResult',
                        component: <CustomResult beforeMessage="Avoid all contact. Consult health department." afterMessage=" Call the emergency number." condition1={true} condition2={false} condition3={true} />,
                        asMessage: true,
                        end: true,
                    },
                    // from id:'12' to id:'16' are dummy values

                    {
                        id: '12',
                        message: 'dummy',
                        end: true,
                    },
                    {
                        id: '13',
                        message: 'dummy',
                        end: true,
                    },
                    {
                        id: '14',
                        message: 'dummy',
                        end: true,
                    },
                    {
                        id: '15',
                        message: 'dummy',
                        end: true,
                    },
                    {
                        id: '16',
                        message: 'dummy',
                        end: true,
                    },

                    //results
                    {
                        id: 'ResEmergency',
                        message: 'Call the emergency number. Avoid all contact.',
                        end: true,
                    },
                    {
                        id: 'ResCallDr',
                        message: 'Call Doctor.',
                        end: true,
                    },
                    {
                        id: 'ResConHlth',
                        message: 'Avoid all contact. Consult health department',
                        end: true,
                    },

                ]}
            />
        </div >
    )
}


