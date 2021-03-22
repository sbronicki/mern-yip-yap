import classes from './HeaderPFPContainer.module.css'
import Header from './Header/Header'
import PFP from './PFP/PFP'

const headerPFPContainer = () => (
    <div className={classes.HeaderPFPContainer}>
        <Header />
        <PFP />
    </div>
)

export default headerPFPContainer