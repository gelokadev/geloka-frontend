import moment from 'moment';
import { range } from 'lodash';
import { OAUTH, API_BASE_URL } from '../configs/AppConfig';

const languages = [
	{
		code: 'en',
		label: 'English'
	}
]

class Utils {

	// format to yyyy-mm-dd
	static formatDate1(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}

	static languageCodeToLabel(code) {
		return languages.find(l => l.code.toLowerCase() === code.toLowerCase())?.label;
	}

	/**
	 * Get first character from first & last sentences of a username
	 * @param {String} name - Username
	 * @return {String} 2 characters string
	 */
	static getNameInitial(name) {
		let initials = name.match(/\b\w/g) || [];
		return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
	}

	/**
	 * Get current path related object from Navigation Tree
	 * @param {Array} navTree - Navigation Tree from directory 'configs/NavigationConfig'
	 * @param {String} path - Location path you looking for e.g '/app/dashboards/analytic'
	 * @return {Object} object that contained the path string
	 */
	static getRouteInfo(navTree, path) {
		if (navTree.path === path) {
			return navTree;
		}
		let route;
		for (let p in navTree) {
			if (navTree.hasOwnProperty(p) && typeof navTree[p] === 'object') {
				route = this.getRouteInfo(navTree[p], path);
				if (route) {
					return route;
				}
			}
		}
		return route;
	}

	/**
	 * Get accessible color contrast
	 * @param {String} hex - Hex color code e.g '#3e82f7'
	 * @return {String} 'dark' or 'light'
	 */
	static getColorContrast(hex) {
		if (!hex) {
			return 'dark'
		}
		const threshold = 130;
		const hRed = hexToR(hex);
		const hGreen = hexToG(hex);
		const hBlue = hexToB(hex);
		function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
		function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
		function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
		function cutHex(h) { return (h.charAt(0) === '#') ? h.substring(1, 7) : h }
		const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
		if (cBrightness > threshold) {
			return 'dark'
		} else {
			return 'light'
		}
	}

	/**
	 * Darken or lighten a hex color 
	 * @param {String} color - Hex color code e.g '#3e82f7'
	 * @param {Number} percent - Percentage -100 to 100, positive for lighten, negative for darken
	 * @return {String} Darken or lighten color 
	 */
	static shadeColor(color, percent) {
		let R = parseInt(color.substring(1, 3), 16);
		let G = parseInt(color.substring(3, 5), 16);
		let B = parseInt(color.substring(5, 7), 16);
		R = parseInt(R * (100 + percent) / 100);
		G = parseInt(G * (100 + percent) / 100);
		B = parseInt(B * (100 + percent) / 100);
		R = (R < 255) ? R : 255;
		G = (G < 255) ? G : 255;
		B = (B < 255) ? B : 255;
		const RR = ((R.toString(16).length === 1) ? `0${R.toString(16)}` : R.toString(16));
		const GG = ((G.toString(16).length === 1) ? `0${G.toString(16)}` : G.toString(16));
		const BB = ((B.toString(16).length === 1) ? `0${B.toString(16)}` : B.toString(16));
		return `#${RR}${GG}${BB}`;
	}

	/**
	 * Convert RGBA to HEX 
	 * @param {String} rgba - RGBA color code e.g 'rgba(197, 200, 198, .2)')'
	 * @return {String} HEX color 
	 */
	static rgbaToHex(rgba) {
		const trim = str => (str.replace(/^\s+|\s+$/gm, ''))
		const inParts = rgba.substring(rgba.indexOf("(")).split(","),
			r = parseInt(trim(inParts[0].substring(1)), 10),
			g = parseInt(trim(inParts[1]), 10),
			b = parseInt(trim(inParts[2]), 10),
			a = parseFloat(trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2);
		const outParts = [
			r.toString(16),
			g.toString(16),
			b.toString(16),
			Math.round(a * 255).toString(16).substring(0, 2)
		];

		outParts.forEach(function (part, i) {
			if (part.length === 1) {
				outParts[i] = '0' + part;
			}
		})
		return (`#${outParts.join('')}`);
	}

	/**
	 * Returns either a positive or negative 
	 * @param {Number} number - number value
	 * @param {any} positive - value that return when positive
	 * @param {any} negative - value that return when negative
	 * @return {any} positive or negative value based on param
	 */
	static getSignNum(number, positive, negative) {
		if (number > 0) {
			return positive
		}
		if (number < 0) {
			return negative
		}
		return null
	}

	/**
	 * Returns either ascending or descending value
	 * @param {Object} a - antd Table sorter param a
	 * @param {Object} b - antd Table sorter param b
	 * @param {String} key - object key for compare
	 * @return {any} a value minus b value
	 */
	static antdTableSorter(a, b, key) {
		if (typeof a[key] === 'number' && typeof b[key] === 'number') {
			return a[key] - b[key]
		}

		if (typeof a[key] === 'string' && typeof b[key] === 'string') {
			a = a[key].toLowerCase();
			b = b[key].toLowerCase();
			return a > b ? -1 : b > a ? 1 : 0;
		}
		return
	}

	/**
	 * Filter array of object 
	 * @param {Array} list - array of objects that need to filter
	 * @param {String} key - object key target
	 * @param {any} value  - value that excluded from filter
	 * @return {Array} a value minus b value
	 */
	static filterArray(list, key, value) {
		let data = list
		if (list) {
			data = list.filter(item => typeof item[key] === "object" ? item[key].id === value : item[key] === value);
		}
		return data
	}

	/**
	 * Remove object from array by value
	 * @param {Array} list - array of objects
	 * @param {String} key - object key target
	 * @param {any} value  - target value
	 * @return {Array} Array that removed target object
	 */
	static deleteArrayRow(list, key, value) {
		let data = list
		if (list) {
			data = list.filter(item => item[key] !== value)
		}
		return data
	}

	/**
	 * Wild card search on all property of the object
	 * @param {Number | String} input - any value to search
	 * @param {Array} list - array for search
	 * @return {Array} array of object contained keyword
	 */
	static wildCardSearch(list, input) {
		const searchText = (item) => {
			for (let key in item) {
				if (item[key] == null) {
					continue;
				}
				if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
					return true;
				}
			}
		};
		list = list.filter(value => searchText(value));
		return list;
	}

	/**
	 * Get Breakpoint
	 * @param {Object} screens - Grid.useBreakpoint() from antd
	 * @return {Array} array of breakpoint size
	 */
	static getBreakPoint(screens) {
		let breakpoints = []
		for (const key in screens) {
			if (screens.hasOwnProperty(key)) {
				const element = screens[key];
				if (element) {
					breakpoints.push(key)
				}
			}
		}
		return breakpoints
	}

	static getFullAuthorisationRequestConfig = () => {
		const headers = {
			Accept: 'application/json',
			Authorization: 'Basic ' + window.btoa(OAUTH.clientId + ":" + OAUTH.clientSecret)
		};
		return headers;
	};

	static objectToFormData = (obj) => {
		let formData = new FormData();
		if (obj instanceof FormData) {
			formData = obj;
		} else {
			Object.keys(obj).forEach(key => {
				if (obj[key] instanceof Array) {
					for (let index = 0; index < obj[key].length; index++) {
						const value = obj[key][index];
						formData.append(key, value);
					}
				} else {
					formData.append(key, obj[key]);
				}
			});
		}
		return formData;
	};

	static getFilePath(file) {
		if (file)
			if (file.startsWith('http') && file.includes(':')) {
				return file;
			} else {
				return `${API_BASE_URL}/${file}`
			}
	}

	static formatDate(date, format = "MMMM Do YYYY") {
		return moment(date).format(format);
	}

	static formatTime(time) {
		return moment(time).format('HH:mm a');
	}

	static formatToHumanRedeable(date) {
		return moment(date).fromNow();
	}

	static Capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}


	static getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}


	static disabledDateTime = () => {
		return {
			disabledHours: () => range(0, 24).splice(4, 20),
			disabledMinutes: () => range(30, 60),
			disabledSeconds: () => [55, 56],
		};
	}
	static disabledDate = (current) => {
		// Can not select days before today and today
		return current && current < moment().endOf('day');
	}

	static sum(data) {
		return data.reduce((a, v) => a = a + v.totalPrice, 0);
	}

	static difference(date1, date2) {
		// const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
		// const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
		const day = 1000 * 60 * 60 * 24;
		let substract = date2 - date1;
		return substract / day;
	}

	static getNumberOfDays(date, currentDate) {
		const date1 = new Date(date);
		const date2 = new Date(currentDate);
		// One day in milliseconds
		const oneDay = 1000 * 60 * 60 * 24;

		// Calculating the time difference between two dates
		const diffInTime = date2.getTime() - date1.getTime();

		// Calculating the no. of days between two dates
		const diffInDays = Math.round(diffInTime / oneDay);

		return diffInDays;
	}

}

export default Utils;