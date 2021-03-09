import classes from '../SignupLoginFormTemplate.module.css'
import Button from '../../../Components/UI/Button/Button'

const signup = (props) => (
    <div className={classes.SignupLoginFormTemplate}>
         <input 
            // ref={(SuLiEmailElement) => {this.SuLiEmailElement = SuLiEmailElement}} 
            type="email" 
            placeholder="Email"
            onChange={(e) => this.savedPost.title = e.target.value} />
        <input 
            // ref={(SuLiPasswordElement) => {this.SuLiPasswordElement =SuLiPasswordElement}} 
           type='password'
            placeholder="Password" 
            onChange={(e) => this.savedPost.content = e.target.value} />
            <Button btnType='Signup'>Sign up</Button>
    </div>
)

export default signup