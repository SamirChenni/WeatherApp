export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>Developed by Chenni Samir in {currentYear} &copy; </p>
        </footer>
)}