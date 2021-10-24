const dateOptions = {
  "weekday": "short",
  "year":    "numeric",
  "month":   "short",
  "day":     "numeric"
};

const now  = new Date();
const date = now.toLocaleDateString("en-UK", dateOptions);
const time = now.toLocaleTimeString("en-UK", {timeZoneName: "short"});

export default podcast => {
  const episodes = podcast.episodes.map(episode => {
    const hhmmss = new Date(episode.seconds * 1000).toISOString().substr(11, 8);
    return `
    <item>
      <title>${episode.title}</title>
      <description>${episode.description}</description>
      <guid isPermaLink="true">${episode.file}</guid>
      <pubDate>${episode.date}</pubDate>
      <media:content medium="audio"
                     url="${episode.file}"
                     type="audio/mpeg"
                     isDefault="true"
                     expression="full"
                     duration="${episode.seconds}">
        <media:title type="plain">${episode.title}</media:title>
        <media:description>${episode.description}</media:description>
        <media:rating scheme="urn:simple">${podcast.rating}</media:rating>
        <media:thumbnail url="${podcast.image}" />
        <media:keywords>${podcast.keywords}</media:keywords>
      </media:content>
      <enclosure url="${episode.file}" length="${episode.bytes}" type="audio/mpeg" />
      <itunes:image href="${podcast.image}" />
      <itunes:explicit>${podcast.explicit}</itunes:explicit>
      <itunes:duration>${hhmmss}</itunes:duration>
    </item>
`.trim();
  }).join("\n    ");

  return `
<rss version="2.0"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:creativeCommons="http://backend.userland.com/creativeCommonsRssModule"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <atom:link href="${podcast.feedURL}"
               rel="self"
               type="application/rss+xml" />
    <title>${podcast.name}</title>
    <link>${podcast.homepageURL}</link>
    <description>${podcast.description}</description>
    <managingEditor>${podcast.email}</managingEditor>
    <webMaster>${podcast.email}</webMaster>
    <language>en-us</language>
    <copyright>
      Copyright (C) ${now.getFullYear()}
      ${podcast.legal}. All Rights Reserved.
    </copyright>
    <creativeCommons:license>
      https://creativecommons.org/licenses/by-nc-nd/4.0/
    </creativeCommons:license>
    <pubDate>${date} ${time}</pubDate>
    <lastBuildDate>${date} ${time}</lastBuildDate>
    <image>
      <url>${podcast.image}</url>
      <title>{podcast.name}</title>
      <link>${podcast.homepageURL}</link>
    </image>
    <docs>http://rssboard.org/rss-specification</docs>
    <itunes:author>${podcast.legal}</itunes:author>
    <itunes:keywords>${podcast.keywords}</itunes:keywords>
    <itunes:category text="category">
      <itunes:category text="${podcast.subCategory}" />
    </itunes:category>
    <itunes:explicit>${podcast.explicit}</itunes:explicit>
    <itunes:image href="${podcast.image}" />
    <itunes:owner>
      <itunes:name><![CDATA[${podcast.name}]]></itunes:name>
      <itunes:email>${podcast.email}</itunes:email>
    </itunes:owner>
    ${episodes}
  </channel>
</rss>`.trim();
};
