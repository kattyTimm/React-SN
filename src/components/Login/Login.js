import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import {Input, CreateField} from '../Common/FormsControls/FormControls';
import s from '../Common/FormsControls/FormControls.module.css';
import {requiredFields, maxLengthCreators} from '../../utilities/validators/validators';
import {loginThunk} from '../../auth-reducer';

const maxLengthLogin20 = maxLengthCreators(20);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
//debugger;
    return (
               <form onSubmit={handleSubmit}>
                    {CreateField ("email", Input, "email", [requiredFields, maxLengthLogin20])}
                    {CreateField("password", Input, "password", [requiredFields, maxLengthLogin20], {type: "password"})}
                    {CreateField(null, Input, "rememberMe", [], {type: "checkbox"}, "remember me")}

                     <div>
                         {captchaUrl && <img src={captchaUrl} />}
                         {captchaUrl &&   CreateField('enter symbols', Input, "captcha", [requiredFields])  }

                         {error &&  <div className={s.formSumaryError}>
                                             {error}
                                         </div>
                          }
                          <button>Login</button>
                     </div>
               </form>
            )
}


//  в функцию reduxForm надо засунуть ту компоненту, которую надо обернуть контейнерной компонентой
const LoginReduxForm = reduxForm({
    form: 'login'  // имя формы в state (state.form.post), уникальное имя формы
})(LoginForm);

const Login = ({loginThunk, isAuth, ...props}) => {

      const onSubmit = (data) => {
         let {email, password, rememberMe, captcha} = data;

        loginThunk(email, password, rememberMe, captcha);
      }

     if(isAuth) return <Redirect to={"/profile"} />

	return <div>
  			   <h1> Login </h1>
  			   <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captcha}/>
	       </div>
}

const mapStateToProps = (state) => ({isAuth: state.auth.isAuth, captcha: state.auth.captchaUrl});

export default connect(mapStateToProps, {loginThunk})(Login);
