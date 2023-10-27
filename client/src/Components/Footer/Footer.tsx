import styles from "./Footer.module.css";
import logoR from "./assets/logo-removedbackground.png";
const Footer = () =>{
    return (
        <footer className={styles.footer}>
            <p>© <img className={styles.logoR} src={logoR} alt="logo" /></p>
            <section className={styles.containerHelpdesk}>
                <h3>Helpdesk</h3>
                <div className={styles.line}></div>
                <p>02 555 55 55</p>
                <p>grant.T@gmail.com</p>
            </section>
        </footer>
    )
}
export default Footer;