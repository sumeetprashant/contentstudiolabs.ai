import React, { useState } from 'react';
import { 
  Coffee, Activity, Map, Bone, Lightbulb, Moon, Zap, Wind, Clock, MonitorPlay
} from 'lucide-react';

const FontStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
    
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: #050505; }
    
    .serif { font-family: 'Playfair Display', Georgia, serif; }
    .sans { font-family: 'Inter', -apple-system, sans-serif; }
    
    .gradient-text {
      background: linear-gradient(to right, #a78bfa, #60a5fa, #4ade80);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .card:hover { border-color: rgba(255,255,255,0.1) !important; }
    .card:hover .glow { opacity: 0.15 !important; }
    .card:hover .icon-ring { border-color: rgba(255,255,255,0.1) !important; }
    
    .nav-btn:hover { color: rgba(255,255,255,0.4) !important; }
    .footer-link:hover { color: #ffffff !important; }

    .spread { display: flex; justify-content: space-between; width: 100%; }
  `}} />
);

const BriefCard = ({ taskNumber, title, tagline, script, notes, icon: Icon, accentColor }) => (
  <div className="card" style={{
    position: 'relative', background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.03)',
    borderRadius: 24, padding: 32, transition: 'all 0.7s', overflow: 'hidden'
  }}>
    <div className="glow" style={{
      position: 'absolute', right: -48, top: -48, width: 192, height: 192,
      borderRadius: '50%', filter: 'blur(110px)', opacity: 0.07,
      backgroundColor: accentColor, transition: 'opacity 0.7s'
    }} />
    
    <div style={{ position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
        <div className="icon-ring" style={{
          padding: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 0.3s'
        }}>
          <Icon size={18} strokeWidth={1} color="rgba(255,255,255,0.6)" />
        </div>
        <div>
          <span className="sans" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.2)', fontWeight: 300, display: 'block', marginBottom: 4 }}>
            task {taskNumber}
          </span>
          <h3 className="serif" style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)', textTransform: 'lowercase', margin: 0 }}>{title}</h3>
          <p className="serif" style={{ fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.3)', textTransform: 'lowercase', margin: '4px 0 0' }}>{tagline}</p>
        </div>
      </div>

      <div>
        <h4 className="sans" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', fontWeight: 300, marginBottom: 16 }}>
          script direction
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {script.map((line, i) => (
            <p key={i} className="sans" style={{ fontSize: 14, lineHeight: 1.7, fontWeight: 200, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 32, marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <h4 className="sans" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', fontWeight: 300, marginBottom: 20 }}>
          production notes
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {notes.map((note, i) => (
            <li key={i} className="sans" style={{ display: 'flex', gap: 16, fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 200, lineHeight: 1.6, textTransform: 'lowercase' }}>
              <div style={{ marginTop: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const DaySection = ({ day, date, tasks }) => (
  <div style={{ marginBottom: 96 }}>
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 8 }}>
        <h2 className="serif" style={{ fontSize: 36, fontWeight: 300, color: 'rgba(255,255,255,0.9)', letterSpacing: -1, textTransform: 'lowercase', margin: 0 }}>{day}</h2>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, rgba(255,255,255,0.05), transparent)' }} />
      </div>
      <span className="sans" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>{date}</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: 32 }}>
      {tasks.map((task, idx) => (
        <BriefCard key={idx} {...task} />
      ))}
    </div>
  </div>
);

const App = () => {
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    {
      day: "wednesday", date: "25th march 2026",
      tasks: [
        { taskNumber: 1, title: "brewcraft coffee", tagline: "your morning, perfected.", icon: Coffee, accentColor: "#a78bfa",
          script: ["\u201cmy mornings used to be chaos. grab whatever, rush out.\u201d", "\u201cthen i tried brewcraft \u2014 single-origin, slow-roasted, delivered fresh.\u201d", "\u201cnow my morning is the best part of my day.\u201d", "\u201cone sip, and everything just... slows down.\u201d"],
          notes: ["cozy lifestyle aesthetic \u2014 morning light, kitchen counter, steam rising.", "asmr close-ups: beans pouring, coffee dripping, first sip.", "warm, relaxed female ai voiceover. bgm: soft jazz / lo-fi.", "end on a slow-motion sip with logo fade-in."]
        },
        { taskNumber: 2, title: "pulsetrack fitness", tagline: "every rep counts.", icon: Activity, accentColor: "#60a5fa",
          script: ["\u201ci used to work out with zero clue if i was making progress.\u201d", "\u201cpulsetrack changed that. real-time tracking. smart coaching.\u201d", "\u201cit\u2019s like having a personal trainer on your wrist.\u201d", "\u201cthirty days in, and i\u2019m not the same person anymore.\u201d"],
          notes: ["high-energy fitness montage \u2014 gym, outdoors, home workouts.", "quick cuts synced to beat drops. show wearable screen with stats.", "motivational male ai voiceover. bgm: upbeat electronic / hip-hop.", "close with heart-rate animation morphing into brand logo."]
        }
      ]
    },
    {
      day: "thursday", date: "26th march 2026",
      tasks: [
        { taskNumber: 3, title: "wanderly travel", tagline: "explore without a plan.", icon: Map, accentColor: "#fbbf24",
          script: ["\u201ceveryone said i needed an itinerary. every hour booked.\u201d", "\u201ci said no. i opened wanderly and let it surprise me.\u201d", "\u201ca hidden waterfall in bali. a rooftop cafe in lisbon.\u201d", "\u201cthe best trips are the ones you don\u2019t plan.\u201d"],
          notes: ["dreamy travel montage \u2014 drone shots, golden-hour, markets.", "subtle phone ui showing wanderly app recommendations.", "adventurous, young female ai voiceover. bgm: indie folk.", "end with passport stamp animation revealing the logo."]
        },
        { taskNumber: 4, title: "mellow pet foods", tagline: "because they deserve real food.", icon: Bone, accentColor: "#34d399",
          script: ["\u201ci read the label on his old food. couldn\u2019t pronounce half of it.\u201d", "\u201cswitched to mellow \u2014 real chicken, real vegetables.\u201d", "\u201che\u2019s got more energy. his coat is shinier.\u201d", "\u201cif i wouldn\u2019t eat it, why would i feed it to him?\u201d"],
          notes: ["heartwarming pet + owner story \u2014 golden retriever.", "clean kitchen aesthetic. show fresh ingredients in bowl.", "genuine, caring female ai voiceover. bgm: warm acoustic.", "end with dog looking up happily, logo fade-in."]
        }
      ]
    },
    {
      day: "friday", date: "27th march 2026",
      tasks: [
        { taskNumber: 5, title: "lumos study lamp", tagline: "light the way to focus.", icon: Lightbulb, accentColor: "#818cf8",
          script: ["\u201clate nights. tired eyes. that cheap desk lamp wasn\u2019t helping.\u201d", "\u201clumos adjusts \u2014 cool light for focus, warm light for winding down.\u201d", "\u201cmy eyes stopped hurting. my focus got sharper.\u201d", "\u201csometimes the smallest change makes the biggest difference.\u201d"],
          notes: ["study / wfh aesthetic \u2014 clean desk, books, laptop.", "smooth transition showing lamp shifting color temperatures.", "calm, studious male ai voiceover. bgm: ambient / soft piano.", "end with time-lapse of lamp shifting from cool to warm."]
        },
        { taskNumber: 6, title: "drift sleep co.", tagline: "fall asleep faster. wake up better.", icon: Moon, accentColor: "#c084fc",
          script: ["\u201ci\u2019d lie awake for hours. staring at the ceiling. mind racing.\u201d", "\u201cdrift\u2019s weighted blanket and pillow mist \u2014 it sounds too simple.\u201d", "\u201cbut ten minutes in, i was gone. deep, heavy, perfect sleep.\u201d", "\u201ci don\u2019t dread bedtime anymore. i look forward to it.\u201d"],
          notes: ["serene bedroom setting \u2014 moonlight, soft fabrics, mist spray.", "visual contrast: tossing/turning vs. peaceful, still sleep.", "whisper-soft female ai voiceover. bgm: ambient pads.", "end with slow fade to black, logo appearing like a soft glow."]
        }
      ]
    },
    {
      day: "saturday", date: "28th march 2026",
      tasks: [
        { taskNumber: 7, title: "zestbite snack bars", tagline: "fuel that actually tastes good.", icon: Zap, accentColor: "#f472b6",
          script: ["\u201cevery healthy snack bar i\u2019ve tried tasted like cardboard.\u201d", "\u201czestbite? mango chili. dark chocolate sea salt.\u201d", "\u201cit\u2019s got protein, fibre, zero junk \u2014 and it actually slaps.\u201d", "\u201chealthy doesn\u2019t have to mean boring.\u201d"],
          notes: ["vibrant visuals \u2014 bright colors, ingredient explosions.", "close-up of bar breaking in slow-mo showing ingredients.", "energetic young male ai voiceover. bgm: upbeat pop / funk.", "end with three flavors landing on screen, logo stamp."]
        },
        { taskNumber: 8, title: "aura home fragrance", tagline: "set the mood. without a word.", icon: Wind, accentColor: "#94a3b8",
          script: ["\u201ci walked into her apartment and it just... hit different.\u201d", "\u201cit smelled like a rainy sunday morning in the mountains.\u201d", "\u201cshe said it was aura. one scent, and the whole room changed.\u201d", "\u201cyour space speaks before you do. make it unforgettable.\u201d"],
          notes: ["aesthetic, moody interior \u2014 diffuser mist, candle glow.", "slow, graceful camera movements. visible scent mist.", "smooth, intimate male ai voiceover. bgm: r&b / chill beats.", "end with close-up of diffuser, mist curling into logo."]
        }
      ]
    }
  ];

  return (
    <div className="sans" style={{ minHeight: '100vh', background: '#050505', color: 'rgba(255,255,255,0.9)' }}>
      <FontStyles />
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '80px 40px', position: 'relative', zIndex: 10 }}>
        
        {/* Header */}
        <header style={{ marginBottom: 96 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48 }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
                <div style={{ width: 20, height: 20, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                  <div style={{ width: 8, height: 8, background: '#000' }} />
                </div>
                <span className="sans" style={{ fontSize: 11, letterSpacing: '0.5em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                  contentstudiolabs.ai
                </span>
              </div>
              
              <div style={{ marginBottom: 40, textTransform: 'lowercase' }}>
                <h2 className="serif gradient-text" style={{ fontSize: 'clamp(56px, 10vw, 128px)', fontWeight: 300, letterSpacing: -3, lineHeight: 0.85, margin: 0 }}>
                  creative
                </h2>
                <div className="serif spread" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontStyle: 'italic', opacity: 0.4, paddingLeft: 4, paddingRight: 4, maxWidth: 340 }}>
                  {"task briefs".split("").map((char, i) => (
                    <span key={i}>{char === " " ? "\u00A0" : char}</span>
                  ))}
                </div>
              </div>
              
              <div className="sans" style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: 32 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={11} strokeWidth={1} /> ai video production</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>trainee: somya</span>
              </div>
            </div>

            <div style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.04)', padding: 32, borderRadius: 32, maxWidth: 280 }}>
              <h4 className="sans" style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 16px' }}>
                <MonitorPlay size={12} strokeWidth={1} /> assignment parameters
              </h4>
              <p className="serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, textTransform: 'lowercase', margin: 0 }}>
                deliver one high-fidelity edit per day (15\u201330s). ensure visual consistency and high-intent creative direction.
              </p>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 48, marginBottom: 80, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.02)', overflowX: 'auto' }}>
          {days.map((d, idx) => (
            <button
              key={idx}
              className="nav-btn"
              onClick={() => setActiveDay(idx)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                paddingBottom: 16, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', fontWeight: 300, position: 'relative',
                color: activeDay === idx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                transition: 'color 0.3s',
                borderBottom: activeDay === idx ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent'
              }}
            >
              day 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Content */}
        <main>
          <DaySection {...days[activeDay]} />
        </main>

        {/* Footer */}
        <footer style={{ marginTop: 128, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
          <div className="sans" style={{ color: 'rgba(255,255,255,0.1)', fontSize: 8, letterSpacing: '0.5em', textTransform: 'uppercase' }}>
            © 2026 content studio labs
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="https://contentstudio.co.in" className="footer-link sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.3s' }}>contentstudio.co.in</a>
            <div style={{ width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <a href="https://contentstudiolabs.ai/" className="footer-link sans" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.3s' }}>contentstudiolabs.ai</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;