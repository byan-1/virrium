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

def compare(s1, s2):
    s1 = re.sub(r'[\s+ ]+', ' ', s1)
    s2 = re.sub(r'[\s+ ]+', ' ', s2)
    s1 = re.sub(r'[^a-zA-Z0-9 ]+', '', s1)
    s2 = re.sub(r'[^a-zA-Z0-9 ]+', '', s2)
    sentence_one = s1.lower().split()
    sentence_two = s2.lower().split()
    stopw_one = [w for w in sentence_one if w in stop_words]
    stopw_two = [w for w in sentence_two if w in stop_words]
    sentence_one = [w for w in sentence_one if w not in stop_words]
    sentence_two = [w for w in sentence_two if w not in stop_words]
    exists_one = list(filter(lambda x: x in vocab, sentence_one))
    exists_two = list(filter(lambda x: x in vocab, sentence_two))
    notexists_one = list(filter(lambda x: x not in vocab, sentence_one))
    notexists_two = list(filter(lambda x: x not in vocab, sentence_two))
    d_exists = 0
    if (not exists_one and not exists_one and not notexists_one and not notexists_two):
        return len([w for w in stopw_one if w in stopw_two])/len(len(stopw_one))
    if (exists_one and exists_two):
        d_exists = model.wv.n_similarity(exists_one, exists_two) * len(exists_one)/len(sentence_one)
    d_notexists = len([w for w in notexists_one if w in notexists_two]) * len(notexists_one)/len(sentence_one)
    return d_exists + d_notexists

    