import { APP_NAME } from '../../configs/AppConfig';
import IntlMessage from '../util-components/IntlMessage';

export default function Footer() {
	return (
		<footer className="footer">
			<span><IntlMessage id={'footer.copyrights'} />  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span> <IntlMessage id={'footer.allrights'} /></span>
		</footer>
	)
}

