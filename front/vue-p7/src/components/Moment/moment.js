import moment from 'moment'

function format_date(value){
    if (value) {
        return moment(String(value)).format('hh:mm DD/MM/YYYY')
    }
}

export default format_date