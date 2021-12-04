class FileStorage:
    def create_file(self, file_name, data):
        file_path = 'cache/' + file_name
        with open(file_path, "w") as file:
            file.write(data)
    
    def load_file(self, file_name):
        file_path = 'cache/' + file_name
        with open(file_path, "r") as file:
            data = file.read()
            return data

