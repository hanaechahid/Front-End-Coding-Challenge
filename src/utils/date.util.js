export function calculDate() {
    const dateOffset = (24*60*60*1000) * 30;
    const today = new Date();
    today.setTime(today.getTime() - dateOffset);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return 'created:>'+year+'-'+month+'-'+day;     
}