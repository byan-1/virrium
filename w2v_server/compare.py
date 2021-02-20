from gensim.models import KeyedVectors
from nltk.corpus import stopwords
from nltk import download
from gensim.similarities import WmdSimilarity, SoftCosineSimilarity
from gensim import corpora
import time
from gensim.models import WordEmbeddingSimilarityIndex
from gensim.similarities import SparseTermSimilarityMatrix
import re

download('stopwords')  # Download stopwords list.
model_fname = 'GoogleNews-vectors-negative300-SLIM.bin.gz'
start = time.time()
model = KeyedVectors.load_word2vec_format('./' + model_fname, binary=True)
print('Finished loading model in %.1f sec' % ((time.time()-start)))
stop_words = set(stopwords.words('english'))
vocab = set(model.vocab)

sentence_key = "sentence"
stopw_key = "stopwords"
exists_key = "exists_key"
notexists_key = "notexists"

def compare(s1, s2):
    param_s1 = filterSentence(s1)
    param_s2 = filterSentence(s2)
    d_exists = 0
    if (not param_s1[exists_key] and not param_s2[exists_key] and not param_s1[notexists_key] and not param_s2[notexists_key]):
        return len([w for w in param_s1[stopw_key] if w in param_s2[stopw_key]])/len(param_s1[stopw_key])
    if (param_s1[exists_key] and param_s2[exists_key]):
        d_exists = model.wv.n_similarity(param_s1[exists_key], param_s2[exists_key]) * len(param_s1[exists_key])/len(param_s1[sentence_key])
    d_notexists = len([w for w in param_s1[notexists_key] if w in param_s2[notexists_key]]) * len(param_s1[notexists_key])/len(param_s1[sentence_key])
    return d_exists + d_notexists

def filterSentence(s):
    s = re.sub(r'[\s+ ]+', ' ', s)
    s = re.sub(r'[^a-zA-Z0-9 ]+', '', s)
    sentence = s.lower().split()
    stopw = [w for w in sentence if w in stop_words]
    exists = list(filter(lambda x: x in vocab, sentence))
    notexists = list(filter(lambda x: x not in vocab, sentence))
    return {
        sentence_key: sentence, 
        stopw_key: stopw, 
        exists_key: exists, 
        notexists_key: notexists
    }
    