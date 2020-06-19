let apiData

onFetchData = async (videoId) => {
    try {
        let token = '39kaF6SKwpDWxhOK7NqQ7bSzhN1_Rq2KI05A7J2iuauq1Oo7ob73-Y7IG0D8UsN2ihSkPj-Ae_tmLJi_a03MyMlkolngyOCSkPI9JexriXw2ItGWbK1jDWHTrdJJCxXf2lE-uPl-OmMTXovL05hSazhthzCofBYB2dgqHTDnRUDaxbBh32TXrMAdVWdT7-fZQnEQHZol7SI3xhYLYC6OVqJPsWGPA7SaXbivZJTlqdTqOqEu5XtyR-jfwHWREl-nn_W2v2ALGCkXcQUZaP_IRAtKV7cReRhLFKl4KBNJXRM'
        const response = await fetch(`https://vp-api.gjirafa.com/api/video?videoEntityId=${videoId}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const responseToJson = await response.json()
        apiData = responseToJson
        renderRelatedVideos()
    } catch (error) {
        console.log('Gabim: ', error)
    }
}

let video = document.getElementById('video')

renderVideo = () => {
    video.setAttribute("poster", apiData.ThumbnailUrl)
    video.setAttribute('preload', 'none')
}

onFetchData('315802').then(result => {
    renderVideo()
})