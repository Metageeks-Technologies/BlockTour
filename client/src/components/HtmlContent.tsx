import React, {useEffect, useRef} from "react";

type HtmlContentProps = {
    htmlContent: string;
};

const decodeHtmlEntities = ( html: string ) => {
    const textArea = document.createElement( "textarea" );
    textArea.innerHTML = html;
    return textArea.value;
};

const HtmlContent: React.FC<HtmlContentProps> = ( {htmlContent} ) => {
    // Decode HTML entities to convert &lt; and &gt; to < and >
    const decodedHtmlContent = decodeHtmlEntities( htmlContent );

    // A regex to match embedded iframe tags (for YouTube, Vimeo, etc.)
    const iframeRegex = /<iframe[^>]*src=["']([^"']+)["'][^>]*><\/iframe>/gi;
    const parts = decodedHtmlContent.split( iframeRegex );
    return parts.map( ( part, index ) => {
        if ( index % 2 === 1 ) {
            // This is an embedded video link (iframe src)
            return (
                <div key={index} className="embed-video">
                    <iframe
                        src={part}
                        loading="lazy"
                        className="w-full aspect-video"
                        allowFullScreen
                        frameBorder="0"
                    />
                </div>
            );
        }
        return <div key={index} dangerouslySetInnerHTML={{__html: part}} />;
    } );
};

export default HtmlContent;
