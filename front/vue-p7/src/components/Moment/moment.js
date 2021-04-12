import moment from 'moment'

function format_date(value){
    if (value) {
        return moment(String(value)).format('H:mm DD/MM/YYYY')
    }
}

export default format_date