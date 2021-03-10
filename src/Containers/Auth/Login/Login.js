import classes from '../SignupLoginFormTemplate.module.css'
import Button from '../../../Components/UI/Button/Button'
import Input from '../../../Components/UI/Input/Input'

const login = (props) => (
    <div className={classes.SignupLoginFormTemplate}>
         <Input 
            // ref={(SuLiEmailElement) => {this.SuLiEmailElement = SuLiEmailElement}} 
            type="email" 
            placeholder="Email"
            onChange={(e) => this.savedPost.title = e.target.value} />
        <Input 
            // ref={(SuLiPasswordElement) => {this.SuLiPasswordElement =SuLiPasswordElement}} 
           type='password'
            placeholder="Password" 
            onChange={(e) => this.savedPost.content = e.target.value} />
            <Button btnType='Login'>Log in</Button>
    </div>
)

export default login