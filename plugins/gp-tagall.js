let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    const botNumber = conn.user.jid;
    
    // Only Admin / Owner / Bot
    if (m.sender !== botNumber && !isOwner && !isAdmin) {
        m.reply("🛡️ 𝙏𝙝𝙞𝙨 𝘾𝙤𝙢𝙢𝙖𝙣𝙙 𝙞𝙨 𝙛𝙤𝙧 *𝙂𝙧𝙤𝙪𝙥 𝘼𝙙𝙢𝙞𝙣𝙨*");
        return;
    }

    // Members & Admins
    const admins = participants.filter(p => p.admin).map(p => p.id);
    const members = participants.filter(p => !p.admin).map(p => p.id);

    // Stylish headers
    const groupInfo = `╔═══〔 🔷 𝑪𝒀𝑩𝑬𝑹 𝑺𝑪𝑨𝑵 𝑨𝑪𝑻𝑰𝑽𝑬 🔷 〕
║⚡ *𝑮𝒓𝒐𝒖𝒑:* ${groupMetadata.subject}
║⚡ *𝑻𝒐𝒕𝒂𝒍 𝑴𝒆𝒎𝒃𝒆𝒓𝒔:* ${participants.length}
${text ? `║⚡ *𝑴𝒆𝒔𝒔𝒂𝒈𝒆:* ${text}` : ''} 
╚══════════════════════╝\n`;

    // Admin List (Stylish)
    const adminMentions = admins.length
        ? admins.map(v => '🔹 👑 𝘼𝙙𝙢𝙞𝙣 @' + v.replace(/@.+/, '')).join`\n`
        : '🔹 𝙉𝙤 𝘼𝙙𝙢𝙞𝙣';

    // Member List (Stylish)
    const memberMentions = members.length
        ? members.map(v => '🔹 👥 𝙈𝙚𝙢𝙗𝙚𝙧 @' + v.replace(/@.+/, '')).join`\n`
        : '🔹 𝙉𝙤 𝙈𝙚𝙢𝙗𝙚𝙧';

    // Final Stylish Message
    const tagMessage = `${groupInfo}

╔══〔 👑 𝑨𝑫𝑴𝑰𝑵𝑺 〕══
${adminMentions}

╔══〔 👥 𝑴𝑬𝑴𝑩𝑬𝑹𝑺 〕══
${memberMentions}

╚═══〔 ⚡ 𝑪𝒀𝑩𝑬𝑹 𝑩𝑶𝑻 𝑶𝑵𝑳𝑰𝑵𝑬 ⚡ 〕═══`;

    const allMentions = [...admins, ...members];

    m.reply(tagMessage, null, { mentions: allMentions });
};

handler.help = ['tagall'];
handler.tags = ['group'];
handler.command = ['tagall', 'invo'];
handler.admin = false;
handler.group = true;

export default handler;
