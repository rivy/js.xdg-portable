// v2022-07-13 [rivy]
module.exports = {
	parserOpts: {
		headerPattern: /^(\w+)!?(?:\s*(?:[/(]([\w,/]+)[)]?))?!?\s*[~:]?\s*(.*)$/,
		headerCorrespondence: ['type', 'scope', 'subject'],
	},
};
