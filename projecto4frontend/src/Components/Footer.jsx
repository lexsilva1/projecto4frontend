import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer>
        <div className ={classes.footercontent}>
          <div className = {classes.labelleft}>&copy; José Alexandre Silva</div>
          <div className = {classes.labelright}>Programação Avançada em Java</div>
          <div className = {classes.labelleft}>&copy; Scrum Inc.</div>
          <div className = {classes.labelright}>Projeto 4</div>
        </div>
      </footer>
    );
}

export default Footer;