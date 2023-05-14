import moment from 'moment';

export const handleDateTime = (data: [{[key: string]: string}]) => {

    const timeZone = localStorage.getItem('time_zone');

    if(timeZone !== null && timeZone !== '') {
		data.forEach((item: {[key: string]: string} , index: number) => { 
			if(item.created_at || item.updated_at)
				item.created_at = moment(item.created_at+'Z').utcOffset(`+${timeZone}`).utc().format(`(G[M]T${timeZone}) YYYY-MM-DD HH:mm`);
				item.updated_at = moment(item.updated_at+'Z').utcOffset(`+${timeZone}`).utc().format(`(G[M]T${timeZone}) YYYY-MM-DD HH:mm`);
			
			Object.keys(item).forEach((key) => {
				if(key.includes('time')) {
					item[key] = moment(item[key]+'Z').utcOffset(`+${timeZone}`).utc().format(`(G[M]T${timeZone}) YYYY-MM-DD HH:mm`)
				}
			})
		})	
		
	}else {
		localStorage.setItem('time_zone', '08:00');
		data.forEach((item: {[key: string]: string} , index: number) => {
			if(item.created_at || item.updated_at)
				item.created_at = moment(item.created_at+'Z').utcOffset('+08:00').utc().format(`(G[M]T08:00) YYYY-MM-DD HH:mm`);
				item.updated_at = moment(item.updated_at+'Z').utcOffset('+08:00').utc().format(`(G[M]T08:00) YYYY-MM-DD HH:mm`);
			
			Object.keys(item).forEach((key) => {
				if(key.includes('time')) {
					item[key] = moment(item[key]+'Z').add('08:00').format(`(G[M]T80:00) YYYY-MM-DD HH:mm`)
				}
			})
		})	
	}

	return data;

}