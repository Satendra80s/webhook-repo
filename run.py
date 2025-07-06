from app import create_app

def run_app():
    """Run the Flask application."""
    try:
        app = create_app()
        # Start the Flask app
        app.run(port=5000,host='0.0.0.0')
    except Exception as e:
        print("Error",e)
        
if __name__ == '__main__': 
    run_app()

