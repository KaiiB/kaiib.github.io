import { useState } from 'react';
import { Button } from '../ui/button';

export const BlogSection = () => {
  const [n_samples, setN_samples] = useState(100);
  const [n_features, setN_features] = useState(3);
  const [n_classes, setN_classes] = useState(2);
  const [random_state, setRandom_state] = useState(42);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [showPlots, setShowPlots] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setShowPlots(false);

    // Simulate progress for demo
    const steps = [
      { percent: 10, text: 'Generating data...' },
      { percent: 30, text: 'Fitting LDA...' },
      { percent: 50, text: 'Plotting LDA...' },
      { percent: 70, text: 'Fitting QDA...' },
      { percent: 90, text: 'Plotting QDA...' },
      { percent: 100, text: 'All done!' },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress(step.percent);
      setProgressText(step.text);
    }

    setShowPlots(true);
    setLoading(false);
  };

  return (
    <section id="blog" className="section-container pb-32">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-foreground mb-12 text-center">
          BLOG
        </h2>
        
        <article className="content-card">
          <h3 className="text-2xl md:text-3xl font-serif tracking-wide text-foreground mb-6">
            Discriminant Analysis Simulation
          </h3>
          
          <div className="border-l-4 border-accent pl-4 mb-6">
            <p className="text-muted-foreground leading-relaxed">
              I was studying for my machine learning final and decided to create this cool tool to visualize 
              discriminant analysis. Here, you can explore Linear and Quadratic Discriminant Analysis with 
              interactive 3D visualizations.
            </p>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
            <p>
              LDA and QDA both estimate the probability a data point belongs to a given class, and selects the 
              class that generates the maximum probability (using log-likelihoods and Bayes' theorem). They both 
              also assume that the data is generated from a multivariate normal distribution, with estimated mean and
              covariance. The difference is that QDA assumes each class has a separate covariance matrix, whereas LDA 
              assumes that each class uses the same covariance matrix.
            </p>
            <p>
              The discriminant function for a class gives the likelihood a point belongs to that class. For any given two classes,
              if we set their discriminant functions equal, the set of all points that satisfy the equality form a boundary curve
              between the two classes. The points on the boundary curve between the two classes mean that our algorithm predicts 
              an equal probability of having either class assigned to any point on that curve.
            </p>
            <p>
              There are (K choose 2) many combinations of boundary curves, since for each of K classes we can choose 2 to create a 
              boundary on. When two discriminant functions are set equal, they can do different things based on LDA vs QDA. For LDA, 
              the quadratic term ends up only producing linear combinations of X because their coefficients are the same, and the 
              distributed quadratic terms cancel out.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <h4 className="text-xl font-serif text-foreground mb-6">Interactive Simulation</h4>
            
            <form className="simulation-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="n_features">Number of Features</label>
                  <input
                    type="number"
                    id="n_features"
                    value={n_features}
                    onChange={(e) => setN_features(parseInt(e.target.value))}
                    min="2"
                    max="10"
                    required
                  />
                  <span className="help-text">Note: Only the first 3 features will be visualized</span>
                </div>

                <div className="form-group">
                  <label htmlFor="n_classes">Number of Classes</label>
                  <input
                    type="number"
                    id="n_classes"
                    value={n_classes}
                    onChange={(e) => setN_classes(parseInt(e.target.value))}
                    min="2"
                    max="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="n_samples">Number of Samples</label>
                  <input
                    type="number"
                    id="n_samples"
                    value={n_samples}
                    onChange={(e) => setN_samples(parseInt(e.target.value))}
                    min="50"
                    max="1000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="random_state">Random Seed 🎲</label>
                  <input
                    type="number"
                    id="random_state"
                    value={random_state}
                    onChange={(e) => setRandom_state(parseInt(e.target.value))}
                    min="0"
                    required
                  />
                  <span className="help-text">For reproducible results</span>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full mt-4 bg-accent hover:bg-accent/80 text-accent-foreground"
              >
                {loading ? 'Processing...' : 'Generate Dataset & Visualize'}
              </Button>
            </form>

            {loading && (
              <div className="mt-6">
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <p className="progress-text">{progressText} ({progress}%)</p>
              </div>
            )}

            {showPlots && (
              <div className="mt-8 space-y-8">
                <div className="viz-section">
                  <h5 className="text-lg font-serif text-foreground mb-4">Linear Discriminant Analysis (LDA)</h5>
                  <div className="plot-container bg-secondary/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">
                      [3D LDA Visualization - Connect Plotly.js for full functionality]
                    </p>
                  </div>
                </div>
                
                <div className="viz-section">
                  <h5 className="text-lg font-serif text-foreground mb-4">Quadratic Discriminant Analysis (QDA)</h5>
                  <div className="plot-container bg-secondary/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">
                      [3D QDA Visualization - Connect Plotly.js for full functionality]
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
        
        <footer className="mt-16 text-center">
          <p className="text-muted-foreground text-sm tracking-widest">
            © {new Date().getFullYear()} KAII • ALL RIGHTS RESERVED
          </p>
        </footer>
      </div>
    </section>
  );
};
