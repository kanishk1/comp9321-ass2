import pandas as pd
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.utils import shuffle
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


def load_final(final_path, split_percentage):
    df = pd.read_csv(final_path)

    df = shuffle(df)
    df = df.dropna(axis=0)

    X = df.drop(['revenue','poster_path'], axis=1).apply(LabelEncoder().fit_transform).values
    Y = df['revenue'].values
    # X = df.drop('director',axis=1).values

    # columnsToEncode = ['cast', 'director', 'genres', 'original_language', 'poster_path',
    #    'production_companies', 'release_date', 'status', 'title']
    # # print(df['cast'].to_string())
    #
    # for feature in columnsToEncode:
    #     le = LabelEncoder()
    #     try:
    #         df[feature] = le.fit_transform(df[feature])
    #     except:
    #         print('Error encoding ' + feature)
    # df.head()

    # split_point = int(len(X) * split_percentage)
    # final_X_train = X[:split_point]
    # final_y_train = Y[:split_point]
    # final_X_test = X[split_point:]
    # final_y_test = Y[split_point:]
    #
    # return final_X_train, final_y_train, final_X_test, final_y_test

    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.25, random_state=0)
    return X_train, X_test, Y_train, Y_test


if __name__ == '__main__':

    csv_file = 'final_v2.csv'
    final_X, _, final_y, _ = load_final(csv_file, split_percentage=0.7)

    classifiers = [KNeighborsClassifier(),
                   DecisionTreeClassifier(),
                   LinearDiscriminantAnalysis(),
                   GaussianNB(),
                   SVC()
                   ]

    classifier_accuracy_list = []
    for i, classifier in enumerate(classifiers):
        print(classifier)
        accuracies = cross_val_score(classifier, final_X, final_y, cv=5)  # check this line for errors
        classifier_accuracy_list.append((accuracies.mean(), type(classifier).__name__))

    classifier_accuracy_list = sorted(classifier_accuracy_list, reverse=True)
    for item in classifier_accuracy_list:
        print(item[1], ':', item[0])
