import { useState } from 'react';
import { useNavigate } from 'react-router-dom'  
import style from "../../styles/odevler/IletisimFormu.module.css"

function IletisimFormu(){

    const navigate = useNavigate();

    const [toastMessage, setToastMessage] = useState<{yazi:string, valid:boolean} | null>(null);

    const [formVerisi, setFromVerisi] = useState({
        firstName: "",
        secondName: "",
        email: "",
        queryType: 0,
        message: "",
        consent: false
    });

    const [hatalar, setHataVerisi] = useState({
        firstName: false,
        secondName: false,
        email: false,
        queryType: false,
        message: false,
        consent: false
    });

    const hataSifirla = () => {
        setHataVerisi({
            firstName: false,
            secondName: false,
            email: false,
            queryType: false,
            message: false,
            consent: false
        });
    }

    const hataDegisiklikUygula = (name:string, value:boolean) => {
        setHataVerisi(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const degisiklikUygula = (e : any) => {
        const { name, value, type, checked } = e.target;
        setFromVerisi(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validate = (e : any) => {
        e.preventDefault();
        hataSifirla();
        let isValid = true;

        if (formVerisi.firstName == "" || formVerisi.firstName.length < 3){
            hataDegisiklikUygula("firstName", true);
            isValid = false;
        }
        if (formVerisi.secondName == "" || formVerisi.secondName.length < 3){
            hataDegisiklikUygula("secondName", true);
            isValid = false;
        }
        if (formVerisi.email == "" || !/\S+@\S+\.\S+/.test(formVerisi.email)){
            hataDegisiklikUygula("email", true);
            isValid = false;
        }

        if (formVerisi.queryType === 0) {
            hataDegisiklikUygula("queryType", true);
            isValid = false;
        }

        if (formVerisi.message == "") {
            hataDegisiklikUygula("message", true);
            isValid = false;
        }

        if (!formVerisi.consent) {
            hataDegisiklikUygula("consent", true);
            isValid = false;
        }


        setToastMessage(isValid ? {yazi:"Your form is sent", valid:true} : {yazi:"Please fill in all required fields.", valid:false});
        setTimeout(() => setToastMessage(null), 3000);
    }

    
    return (
        <div id={style.root}>
            <div id={style.register}>
                <form onSubmit={validate}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <p id={style.fitText} style={{fontSize:"6px"}}>dont</p>
                        <h1 id={style.fitText}>Contact Us</h1>
                    </div>
                    <div id={style.stack}>
                        <div id={style.fieldContainer}>
                            <label style={hatalar.firstName ? {color:"red"} : {color:"black"}} htmlFor="ad">First Name {hatalar.firstName ? "*" : ""}</label>
                            <input name="firstName" value={formVerisi.firstName} onChange={degisiklikUygula} id="ad" type="text" />
                        </div>
                        <div id={style.fieldContainer}>
                            <label style={hatalar.secondName ? {color:"red"} : {color:"black"}} htmlFor="last">Last Name {hatalar.secondName ? "*" : ""}</label>
                            <input name="secondName" value={formVerisi.secondName} onChange={degisiklikUygula} id="last" type="text" />
                        </div>
                    </div>
                    <br />
                    <div id={style.fieldContainer}>
                        <label style={hatalar.email ? {color:"red"} : {color:"black"}} htmlFor="email">Email Adress {hatalar.email ? "*" : ""}</label>
                        <input name="email" value={formVerisi.email} onChange={degisiklikUygula} id="email" type="text" />
                    </div>
                    <br />
                    <label style={hatalar.queryType ? {color:"red"} : {color:"black"}} htmlFor="radio1" >Query Type {hatalar.queryType ? "*" : ""}</label>
                    <div id={style.stack}> 
                        <div className={style.radioContainer}>
                            <label>
                            <input id="radio1" name="queryType" type="radio" value={1} checked={formVerisi.queryType == 1} onChange={degisiklikUygula} /> General Enquiry
                            </label>
                        </div>
                        <div className={style.radioContainer}>
                            <label>
                            <input id="radio2" name="queryType" type="radio" value={2} checked={formVerisi.queryType == 2} onChange={degisiklikUygula} /> Support Request
                            </label>
                        </div>
                    </div>
                    <br />
                    <div id={style.fieldContainer}>
                        <label style={hatalar.message ? {color:"red"} : {color:"black"}} htmlFor="mesaj">Message {hatalar.message ? "*" : ""}</label>
                        <textarea id="mesaj" className={style.messageBox} name="message" value={formVerisi.message} onChange={degisiklikUygula} cols={40} rows={5}></textarea>
                    </div>
                    <div>
                        <br />
                        <label>
                        <input id="consent-check" name="consent" type="checkbox" checked={formVerisi.consent} onChange={degisiklikUygula} /> <label style={hatalar.consent ? {color:"red"} : {color:"black"}}>Sure, sell my soul, browser history, and my favorite pizza topping to the highest bidder. {hatalar.consent ? "*" : ""}</label>
                        </label>
                    </div>
                    <button className={style.Submit} type="submit">Submit</button>
                </form>
                <button onClick={() => navigate("/Odevler")} className={style.geriButon}>Geri Dön</button>
            </div>
            {toastMessage && (
                <div style={toastMessage.valid ? {backgroundColor:"green"} : {backgroundColor:"red"}} className={style.toast}>
                    {toastMessage.yazi}
                </div>
            )}
        </div>
    );
}

export default IletisimFormu;