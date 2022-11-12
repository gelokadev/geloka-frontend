import { APP_NAME } from '../../configs/AppConfig';

export default function Footer() {
	return (
		<footer className="footer">
			<span>Copyrights  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span> Tout droits reservés</span>
		</footer>
	)
}

