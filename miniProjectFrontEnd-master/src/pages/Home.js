import React, { useContext } from 'react';
import { MainContext } from '../context/maincontext'
import covidCover from '../images/covidCover.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import SymptomChecker from './SymptomChecker';


function Home() {
    let { tokenVerified, username, isLogin } = useContext(MainContext)

    if (tokenVerified === true || isLogin === true) {
        return (

            <div style={{
                width: "100%"
            }}>
                <SymptomChecker />
                <div style={{
                    position: "relative",
                    textAlign: "center",
                }}>
                    <img src={covidCover} style={{ width: "100%", objectFit: "cover", height: "400px" }} />
                    <h2 style={{
                        position: "absolute",
                        bottom: "0px",
                        left: "10px", backgroundColor: "white", padding: "5px 25px 0px 25px", fontSize: "45px", borderRadius: "5px"
                    }}>Coronavirus</h2>
                </div>
                <div style={{
                    position: "relative",
                    textAlign: "left",
                    width: "890px",
                    marginTop: "30px",
                    marginLeft: "20px",
                    fontSize: "20px",
                    lineHeight: "1.6"
                }}><Tabs>
                        <TabList>
                            <Tab>Overview</Tab>
                            <Tab>Prevention</Tab>
                            <Tab>Symptoms</Tab>

                        </TabList>

                        <TabPanel>
                            <p style={{ margin: "15px 0 0 0px" }}>Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.</p>
                            <p style={{ margin: "15px 0 0 0px" }}>Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.</p>
                            <p style={{ margin: "15px 0 0 0px" }}>The best way to prevent and slow down transmission is to be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face. </p>
                            <p style={{ margin: "15px 0 0 0px" }}>The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).</p>
                        </TabPanel>
                        <TabPanel>
                            <p style={{ margin: "15px 0 0 0px" }}>
                                To prevent infection and to slow transmission of COVID-19, do the following:
                    <ul style={{ margin: "10px 0 10px 25px" }}>
                                    <li>                        Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub.
                            </li>
                                    <li>                         Maintain at least 1 metre distance between you and people coughing or sneezing.
                            </li>
                                    <li>                        Avoid touching your face.
                            </li>
                                    <li>                        Cover your mouth and nose when coughing or sneezing.
                            </li>
                                    <li>                        Stay home if you feel unwell.
                            </li>
                                    <li>                        Refrain from smoking and other activities that weaken the lungs.
                            </li>
                                    <li>                                               Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people.

                            </li>
                                </ul>
                            </p>



                        </TabPanel>
                        <TabPanel>
                            <p style={{ margin: "15px 0 0 0px" }}>COVID-19 affects different people in different ways. Most infected people will develop mild to moderate illness and recover without hospitalization.</p>
                            <p style={{ margin: "10px 0 0 20px" }}>
                                Most common symptoms:
                            <ul style={{ margin: "10px 0 10px 20px" }}>
                                    <li>fever.</li>
                                    <li> dry cough.</li>
                                    <li>tiredness.</li>
                                </ul>
                            </p>
                            <p style={{ margin: "10px 0 0 20px" }}>
                                Less common symptoms:
                            <ul style={{ margin: "10px 0 10px 20px" }}>
                                    <li>aches and pains.</li>
                                    <li> sore throat.</li>
                                    <li>diarrhoea.</li>
                                    <li>conjunctivitis.</li>
                                    <li>loss of taste or smell.</li>
                                    <li>a rash on skin, or discolouration of fingers or toes.</li>
                                </ul>
                            </p>
                            <p style={{ margin: "10px 0 0 20px" }}>
                                Serious symptoms:
                            <ul style={{ margin: "10px 0 10px 20px" }}>
                                    <li>difficulty breathing or shortness of breath.</li>
                                    <li>chest pain or pressure.</li>
                                    <li>loss of speech or movement.</li>
                                    <li>loss of taste or smell.</li>
                                    <li>a rash on skin, or discolouration of fingers or toes.</li>
                                </ul>
                            </p>
                            <p style={{ margin: "15px 0 0 0px" }}> Seek immediate medical attention if you have serious symptoms.  Always call before visiting your doctor or health facility. </p>

                            <p style={{ margin: "15px 0 0 0px" }}>People with mild symptoms who are otherwise healthy should manage their symptoms at home. </p>

                            <p style={{ margin: "15px 0 0 0px" }}>On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days. </p>
                        </TabPanel>
                    </Tabs></div>
                <br />
            </div>)
    }
    else {
        return (<div>Invalid entry</div>)
    }
}
export default Home;
// { margin: "0.1px auto", alignItems: "center", width: "100%" }
// { width: "100%", height: "400px", objectFit: "cover" }