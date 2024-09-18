import {DiscussionEmbed} from 'disqus-react'; 

const DiscussionEmbedComponent = ({ article }:{article:any}) => (
    <DiscussionEmbed
        shortname={`${process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}`}
        config={{
            url: article.url,
            identifier: article._id,
            title: article.title,
            language: 'EN' 
        }}
    />
);

export default DiscussionEmbedComponent;