renderRelatedVideos = () => {
    let relatedVideosDiv = document.getElementById('relatedVideos')
    relatedVideosDiv.innerHTML = ""
    apiData.Related.map((next, index) => {
        if (index < 4) {
            let relatedItem = document.createElement("a")
            relatedItem.setAttribute('class', 'relatedVideoItem')
            relatedItem.setAttribute('onclick', `playRelatedVideos(${next.EntityId})`)
            relatedVideosDiv.appendChild(relatedItem)

            let img = document.createElement("img")
            img.setAttribute('src', next.ThumbnailUrl)
            img.setAttribute('class', 'relatedVideoImg')

            let relatedVideoDetails = document.createElement("div")

            let title = document.createElement("p")
            title.innerHTML = next.Title
            title.setAttribute('class', 'relatedVideoTitle')

            let duration = document.createElement("p")
            duration.innerHTML = `Duration: ${next.Duration}`

            let publishDate = document.createElement("p")
            publishDate.innerHTML = `Published: ${next.PublishDate}`

            relatedItem.appendChild(img)
            relatedItem.appendChild(relatedVideoDetails)
            relatedVideoDetails.appendChild(title)
            relatedVideoDetails.appendChild(duration)
            relatedVideoDetails.appendChild(publishDate)
        }
    })
}

playRelatedVideos = (videoId) => {
    onFetchData(videoId).then(result => {
        startVideo()
    })
}