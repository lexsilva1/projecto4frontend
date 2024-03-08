import classes from'./Login.module.css';
import logo from '../multimedia/logo_scrum_01.png'


function Login() {
    return(
<div className={classes.centercontainer}>
    <div className={classes.loginpanel}>
    <img src={logo} alt='logo' height={150}/>
        <form >
            <div >
                <label id ='login' htmlFor='username'>Username</label>
                <input className={classes.input} type='text' id='username' placeholder='username' />
            </div>
            <div >
                <label id='password' htmlFor='password'>Password</label>
                <input className={classes.input} type='password' id='password' placeholder= 'password' />
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>
</div>
 );
}
export default Login;