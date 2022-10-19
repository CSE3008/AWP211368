if('serviceWorker' in navigator){
    console.log('Puede usar los SW en tu Navegador');
    navigator.serviceWorker.register('./sw.js'),
    then(res=> console.log("SW CARGADO CORRECTAMENTE", res))
    catch(err=> console.log("NO SEPUDO REGISTRAR", err));

}else{
    console.log('NO PUEDE usar el SW en tu Navegador');

}