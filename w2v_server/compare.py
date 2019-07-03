from gensim.models import KeyedVectors
from nltk.corpus import stopwords
from nltk import download
from gensim.similarities import WmdSimilarity, SoftCosineSimilarity
from gensim import corpora
import time
from gensim.models import WordEmbeddingSimilarityIndex
from gensim.similarities import SparseTermSimilarityMatrix

#needs to:
#handle unknown words
#handle strings that are empty after filtering stopwords
#handle fullstops, commas 

download('stopwords')  # Download stopwords list.
model_fname = 'GoogleNews-vectors-negative300-SLIM.bin.gz'
start = time.time()
model = KeyedVectors.load_word2vec_format('./' + model_fname, binary=True)
print('Finished loading model in %.1f sec' % ((time.time()-start)))
stop_words = stopwords.words('english')

def compare(s1, s2):
    sentence_one = s1.lower().split()
    sentence_two = s2.lower().split()
    sentence_one = [w for w in sentence_one if w not in stop_words]
    sentence_two = [w for w in sentence_two if w not in stop_words]
    dist = model.wv.n_similarity(sentence_one, sentence_two)
    return dist