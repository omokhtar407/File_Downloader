
/* ******************* Start Loading ****************** */
    $(document).ready(function(){
        $('.my-logo').fadeOut(2500, () => {
            $('.my-logo').parent().fadeOut(3500 , () => {
                $('.loading').remove();
                $('body').css("overflow-y" , "auto");
            })
        });
    })
/* ******************* End Loading ****************** */

/* ****************** Start File Downloader ****************** */
    const fileInput = document.querySelector('input'),
    downloadBtn = document.querySelector('button');

    downloadBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        downloadBtn.innerText = "Downloading file...";
        fetchFile(fileInput.value);
    });

    function fetchFile(url){
        // fetch file & returning response  as blob
        fetch(url).then(res => res.blob()).then(file => {
            
            // URL.createObjectURL create a url of passed object == file
            let tempUrl = URL.createObjectURL(file);
            let aTag = document.createElement('a');
            
            aTag.href = tempUrl;
            aTag.download = url.replace(/^.*[\\\/]/, '');  // passing file last name & extension as download value of <a> tag
            document.body.append(aTag);

            aTag.click();  // clicking <a> Tag so the file download
            
            downloadBtn.innerText = "Download File";
            URL.revokeObjectURL(tempUrl); // removing tempUrl from the document
            aTag.remove(); // removing <a> Tag once file downloaded

        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to download file!'
            });
            downloadBtn.innerText = "Download File";
        });
    }
/* ****************** End File Downloader ****************** */



